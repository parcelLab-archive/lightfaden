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

function updateUser(userId, hybridId, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var user = users[0];
    user.hybridId = hybrisId;
    user.save((err, user) => {
      if (err) callback(err);
      else callback(null, user.hybridId);
    });
  });
}

function findUser(userId, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    callback(null, user[0]);
  });
}

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  findUser: findUser
};
