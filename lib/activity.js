const mongoose = require('mongoose');
const User = require('../lib/model.js').User;

function setActivity(userId, activity, target, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var user = users[0];
    user.targets.push(target);
    user.activities.push(activity);
    user.save((err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    });
  });
}

module.exports = {
  setActivity: setActivity
}