'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  location: String,
  date: Date,
  attendees: Number
});

module.exports = mongoose.model('Event', EventSchema);