const express = require('express');
const logger = require('morgan');
const utils = require('./lib/utils');
const activity = require('./lib/activity');
const products = require('./lib/products');
const ineedhelp = require('./lib/ineedhelp');
const showmemybill = require('./lib/showmemybill');
const lightfaden = require('./lib/lightfaden');
const mongoose = require('mongoose');

const MONGOPATH = 'mongodb://localhost/lighfaden';
const MONGOOPTIONS = {
  useMongoClient: true,
  native_parser: true,
  poolSize: 5,
  keepAlive: true,
  socketOptions: {
    socketTimeoutMS: 0,
    connectionTimeout: 0,
  },
};

mongoose.connection.on('connected', function () {
  console.log('> Connected to MongoDB...');


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
    var q = req.query;
    if (q.activity && q.target) {
      activity.setActivity(q.userId, q.activity, q.target, (err, msg) => {
        if (err) res.status(500).json({msg: err});
        else res.status(200).json({msg: msg});
      });
    } else {
      res.json({msg: 'missing paramater (activity, target)'});
    }
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
});

/////////////////////////////////
// MongoDB Connection Handling //
/////////////////////////////////

mongoose.connection.on('error', function (err) {
  console.error('> Failed to connect to MongoDB on startup ', err);
});

mongoose.connection.on('disconnected', function () {
  console.log('> Mongoose default connection to MongoDB disconnected');
});

var gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log('> MongoDB disconnected through app termination');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {
  mongoose.connect(MONGOPATH, MONGOOPTIONS);
  console.log('> Trying to connect to MongoDB...');
} catch (err) {
  console.log('> Sever initialization failed ', err.message);
}
