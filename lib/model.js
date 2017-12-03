const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userId: String,
  hybrisId: String,
  activities: [],
});

var lightfadenSchema = mongoose.Schema({
  hasActivity: [String],
  hasNotActivity: [String],
  route: [String],
  robot: Boolean,
  text: String,
  action: String,
  payload: Object,
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Lightfaden: mongoose.model('Lightfaden', lightfadenSchema)
};
