const mongoose = require('mongoose');
const User = require('../lib/model.js').User;

function addProduct(userId, name, price, peruse, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var user = users[0];
    user.products.push({name: name, price: price, peruse: peruse});
    user.save((err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    });
  });
}

module.exports = {
  addProduct: addProduct
}