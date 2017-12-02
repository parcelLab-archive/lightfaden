const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userId: String
});

module.exports = {
  userSchema: userSchema
};
