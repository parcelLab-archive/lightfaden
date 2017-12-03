const mongoose = require('mongoose');
const Lightfaden = require('../lib/model.js').Lightfaden;
const User = require('../lib/model.js').User;
const async = require('async');

function getLightfaden(userId, route, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var activities = users[0].activities;
    Lightfaden.find({route: route, hasActivity: {$in: activities}, hasNotActivity: {$nin: activities}}, (err, lightfaeden) => {
      callback(null, lightfaeden);
    });
  });
}

module.exports = {
  getLightfaden: getLightfaden
}