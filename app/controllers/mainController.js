'use strict';

var moment = require('moment'),
    Promise = require('bluebird'),
    Driver = require('../models/Driver');

var controller = {}

controller.getDriversByDay = function(req, res) {
  
}

controller.getDriversByWeek = function(req, res) {
  var days = [ 'mon', 'tue', 'wed', 'thu' ],
      dates = [],
      drivers = {};

  for (var i = 0; i < days.length; i++) {
    dates.push({
      day: days[i],
      date: moment(req.params.monday, 'MM-DD-YYYY')
              .add(i, 'day')
              .format('MM-DD.YYYY')
    });
  }

  Promise.each(dates, function(date) {
    return Driver.find({ date: date.date })
      .then(function(driversForDay) {
        drivers[date.day] = driversForDay;
      });
  }).then(function() {
    res.json(drivers);
  }).catch(function(err) {
    res.status(500).send(err);
  });
}

module.exports = controller;