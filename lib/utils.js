const mongoose = require('mongoose');
const userSchema = require('../lib/model.js');
var User = mongoose.model('User', userSchema);

function createUser(userId, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    if (users.length === 0) {
      var user = new User({ userId: userId });
      user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user);
      });
    }
    callback(null, 'user ' + userId + ' already exists');
  });
}

module.exports = {
  createUser: createUser
};
