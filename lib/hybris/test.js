/* jshint esversion: 6 */

const req = require('rfr');
const settings = req('/settings');

const Hybris = req('/lib/hybris');
var hybris = new Hybris(settings.cred.hybris.clientid, settings.cred.hybris.secret);

// hybris.createCustomer('Max Mustermann', 'info@parcellab.com', 'Landwehrstr. 39', '80336', 'München', (err, id) => console.log(err ? err : 'new user id: ' + id));

// hybris.subscribeCustomerToProduct('6765360536', 'EML-1000', (err, id) => console.log(err ? err : 'new subscription id: ' + id));

hybris.getBillForCustomer('6765360536', Date.now(), (err, bills) => console.log(err ? err : 'got bills: ' + JSON.stringify(bills, ' ', 2)));
