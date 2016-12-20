'use strict';

var mongoose = require('mongoose');

var model = mongoose.model('Driver', new mongoose.Schema({
  date: String,
  name: String,
  id: String
}));

module.exports = model;