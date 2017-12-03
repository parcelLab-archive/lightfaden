const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userId: String,
  products: [{ name: String, price: Number, peruse: Boolean }],
  activities: [],
  targets: [],
});

var lightfadenSchema = mongoose.Schema({
  hasActivity: [String],
  hasNotActivity: [String],
  route: String,  
  payload: Object,
});

module.exports = {
  User: mongoose.model('Lightfaden', userSchema),
  Lightfaden: mongoose.model('Lightfaden', userSchema)
};
