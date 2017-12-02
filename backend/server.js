const express = require('express');
const logger = require('morgan');
const utils = require('./lib/utils');
const activity = require('./lib/activity');
const products = require('./lib/products');
const ineedhelp = require('./lib/ineedhelp');
const showmemybill = require('./lib/showmemybill');
const lightfaden = require('./lib/lightfaden');

const app = express();
app.use(logger('dev'));

app.use((req, res, next) => {
  if (req.query.userId) {
    utils.createUser(req.query.userId, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({msg: err});
      }
      else {
        console.log(data);
        next();
      }
    });
  } else return res.status(500).json({msg: 'missing userId'});
});

app.get('/activity', function(req, res) {
  res.status(501).send();
});

app.get('/showmemybill', function(req, res) {
  res.status(501).send();
});

app.get('/ineedhelp', function(req, res) {
  res.status(501).send();
});

app.get('/products', function(req, res) {
  var q = req.query;
  if (q.name && q.price && q.peruse) {
    products.addProduct(q.userId, q.name, q.price, q.peruse, (err, data) => {
      if (err) res.status(500).json({msg: err});
      else res.status(200).json({msg: data});
    });
  } else {
    res.status(500).json({msg: 'missing paramater (name, price, peruse)'});
  }
});

app.get('/lightfaden', function(req, res) {
  res.status(501).send();
});

var server = app.listen(8080, function(err) {
  if (err) console.log(err);
  else console.log('server is running: http://localhost:3000');
});

process.on('SIGINT', function(){
  console.log('byebye');
  server.close();
});