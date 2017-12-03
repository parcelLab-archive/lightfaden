/* jshint esversion: 6 */

// dependencies

const req = require('rfr');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('async');

// libs

const settings = req('/settings');

const User = req('/lib/model').User;
const Guide = req('/lib/model').Lightfaden;

const template = req('/ui/template/master');

// views

const dashboardView = req('/ui/views/dashboard');
const userView = req('/ui/views/users');
const guideView = req('/ui/views/guides');
const guideEditView = req('/ui/views/guide-edit');
const redirectView = req('/ui/views/redirect');

// config

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
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get(['/', '/dashboard'], function (req, res) {
    async.parallel([
      pcb => User.count(pcb),
      pcb => Guide.count(pcb),
    ], function (err, counts) {
      if (err) res.status(200).send(template('<code>errored: ' + JSON.stringify(err) + '</code>'));
      else res.status(200).send(template(dashboardView(counts[0], counts[1]), 'dashboard'));
    });
  });

  app.get('/users', function (req, res) {
    User.find(function (err, users)  {
      if (err ||  !users) res.status(200).send(template('<code>nothing found</code>'));
      else res.status(200).send(template(userView(users), 'users'));
    });
  });

  app.get('/guides', function (req, res) {
    Guide.find(function (err, guides)  {
      if (err || !guides) res.status(200).send(template('<code>nothing found</code>'));
      else res.status(200).send(template(guideView(guides), 'guides'));
    });
  });

  app.get('/guide/edit/:id', function (req, res) {
    Guide.findOne({ _id: req.params.id }, function (err, guide)  {
      if (err || !guide) res.status(200).send(template('<code>nothing found</code>'));
      else res.status(200).send(template(guideEditView(guide), 'guides'));
    });
  });

  app.post('/guide/edit/:id', function (req, res) {
    async.waterfall([
      function get(wfCallback) {
        if (req.params.id === 'new') wfCallback(null, new Guide({}));
        else Guide.findOne({ _id: req.params.id }, function (err, res) {
          if (err ||  !res) wfCallback('Could not update guide');
          else wfCallback(null, res);
        });
      },
      function save(guide, wfCallback) {
        guide.text = req.body.inputMessage;
        guide.action = req.body.inputType;
        guide.route = req.body.inputRoutes.replace(/\r/g, '').split('\n');
        guide.hasActivity = req.body.inputHasActivities.split(',').map(a => a.trim());
        guide.hasNotActivity = req.body.inputHasNotActivities.split(',').map(a => a.trim());
        guide.payload = JSON.parse(req.body.inputPayload);
        guide.save(err => wfCallback(err, guide));
      }
    ], function done(err, guide) {
      if (err) res.status(200).send(template('<code>Error: ' + JSON.stringify(err) + '</code>', 'guide'));
      else res.status(200).send(template(guideEditView(guide, true), 'guides'));
    });
  });

  app.get('/guide/create', function (req, res) {
    res.status(200).send(template(guideEditView(), 'guides'));
  });

  app.get('/redirect', function (req, res) {
    res.status(200).send(redirectView());
  });

  var server = app.listen(settings.conf.app.port, function (err) {
    if (err) console.log(err);
    else console.log('server is running: http://localhost:' + settings.conf.app.port);
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
