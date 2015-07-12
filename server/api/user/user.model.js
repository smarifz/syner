'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  role: Boolean
});

module.exports = mongoose.model('User', UserSchema);