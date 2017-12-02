const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userId: String,
  products: [{ name: String, price: Number, peruse: Boolean }],
  activities: [],
  targets: [],
});

module.exports = {
  User: mongoose.model('User', userSchema)
};
