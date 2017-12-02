const mongoose = require('mongoose');
const User = require('../lib/model.js').User;

function createUser(userId, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    if (users.length === 0) {
      var user = new User({ userId: userId });
      user.save(function (err, user) {
        if (err) return callback(err);
        return callback(null, user);
      });
    } else return callback(null, 'user ' + userId + ' already exists');
  });
}

module.exports = {
  createUser: createUser
};
