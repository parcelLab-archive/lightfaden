const mongoose = require('mongoose');
const User = require('../lib/model.js').User;

function setActivity(userId, activity, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var user = users[0];
    if (user.activities.indexOf(activity) === -1) user.activities.push(activity);
    user.save((err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    });
  });
}

module.exports = {
  setActivity: setActivity
}