/* jshint esversion: 6 */

// dependencies

const req = require('rfr');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// libs

const settings = req('/settings');

const MONGOPATH = settings.cred.mongo.path;
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

  app.get('/activity', function (req, res) {
    var q = req.query;
    if (q.activity) {
      activity.setActivity(q.userId, q.activity, (err, msg) => {
        if (err) res.status(500).json({ msg: err });
        else res.status(200).json({ msg: msg });
      });
    } else {
      res.json({ msg: 'missing paramater (activity, target)' });
    }
  });

  var server = app.listen(settings.conf.api.port, function (err) {
    if (err) console.log(err);
    else console.log('server is running: http://localhost:' + settings.conf.api.port);
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
