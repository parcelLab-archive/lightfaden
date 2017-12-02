/* jshint esversion: 6 */

const request = require('request');
const _ = require('underscore');
const moment = require('moment');

// internal functions

function handleResult(err, body, key, callback) {
  if (err) callback(err);
  else {
    try {
      body = _.isString(body) ? JSON.parse(body) : body;
      if (!_.has(body, key)) callback(body);
      else callback(null, body[key]);
    } catch (e) {
      callback('parse error: ' + e);
    }
  }
}

function getAuthTokenFromAPI(clientid, secret, callback) {
  var options = {
    method: 'POST',
    url: 'https://api.us.yaas.io/hybris/oauth2/v1/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'client_credentials',
      scope: 'hybris.business-partner-customer_create hybris.subscription_manage hybris.usage_create hybris.bill_view',
      client_id: clientid,
      client_secret: secret,
    },
  };

  request(options, function (err, res, body) {
    handleResult(err, body, 'access_token', callback);
  });
}

function composeBill(bill) {

  function composeItem(item) {
    var base = { product: item.productCode };
    const composeCharge = charge => ({
      type: charge.metricId.toLowerCase(),
      quantity: charge.consumedQuantity.value,
      amount: charge.amount,
    });
    return item.charges.map(charge => Object.assign({}, base, composeCharge(charge)));
  }

  return {
    billingDate: bill.billingDate,
    customerNo: bill.customerId,
    billNo: bill.billingDate + '/' + bill.documentNumber,
    total: bill.totalAmount + ' ' + bill.currency,
    items: bill.billItems.map(composeItem),
  };
}

// prototype

function Hybris(clientid, secret) {
  this.clientid = clientid;
  this.secret = secret;

  this.token = null;
  this.tokenExpires = 0;
}

Hybris.prototype.loadToken = function (callback) {
  if (this.token && this.tokenExpires > Date.now()) callback();
  else {
    getAuthTokenFromAPI(this.clientid, this.secret, function (err, token) {
      console.log('Hybris: refreshing auth token from API');
      if (err) throw err;
      else {
        this.token = token;
        this.tokenExpires = (Date.now() / 1000) + 3000;
        callback();
      }
    });
  }
};

Hybris.prototype.createCustomer = function (name, email, address, postalCode, city, callback) {
  this.loadToken(function () {

    var nameComps = name.split(' ');
    var lastName = _.last(nameComps);
    var firstName = nameComps.slice(0, -1).join(' ');

    var streetComps = address.split(' ');
    var houseNumber = _.last(streetComps);
    var street = streetComps.slice(0, -1).join(' ');

    var options = {
      method: 'POST',
      url: 'https://api.us.yaas.io/hybris/business-partner/v2/customers',
      headers: {
        authorization: 'Bearer ' + this.token,
        'content-type': 'application/json',
      },
      body: {
        personalInfo: { firstName, lastName },
        customerType: 'INDIVIDUAL',
        addresses:
          [{
            email,
            street,
            houseNumber,
            city,
            postalCode,
            state: 'DE',
            country: 'US',
            isDefault: true
          }],
        markets: [{ marketId: 'A1', active: true }]
      },
      json: true
    };

    request(options, function (err, response, body) {
      handleResult(err, body, 'id', callback);
    });

  });
};

Hybris.prototype.subscribeCustomerToProduct = function (customer, product, callback) {
  this.loadToken(function () {

    var now = new Date().toISOString();

    var options = {
      method: 'POST',
      url: 'https://api.us.yaas.io/hybris/subscription/v1/subscriptions',
      headers: {
        authorization: 'Bearer ' + this.token,
        'content-type': 'application/json',
      },
      body: {
        validFrom: now,
        customer: { id: customer + '' },
        market: { id: 'A1' },
        snapshots: [{
          effectiveDate: now,
          items: [{
            itemId: '10',
            product: { code: product },
          }]
        }]
      },
      json: true
    };

    request(options, function (err, response, body) {
      handleResult(err, body, 'subscriptionId', callback);
    });

  });
};

Hybris.prototype.getBillForCustomer = function (customer, month, callback) {
  this.loadToken(function () {

    var startedAt = moment(month).startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    var endedAt = moment(month).endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    var options = {
      method: 'GET',
      url: 'https://api.us.yaas.io/hybris/bill/v1/bills',
      qs: { customerId: customer },
      headers: {
        'cache-control': 'no-cache',
        authorization: 'Bearer ' + this.token,
      },
      body: {
        consumptionPeriod: { startedAt, endedAt, timeZone: 'America/New_York' },
      },
      json: true
    };

    request(options, function (err, response, body) {
      if (err) callback(err);
      else {
        var bills = !_.isArray(body) ? [body] : body;
        callback(null, bills.map(composeBill));
      }
    });


  });
};

// export

module.exports = Hybris;
