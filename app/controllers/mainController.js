'use strict';

var moment = require('moment'),
    Promise = require('bluebird'),
    Driver = require('../models/Driver');

var controller = {};

controller.DAYS_IN_WEEK = 7;

controller.getDriversByWeek = function(req, res) {
  var startDate = req.params.startDate,
      week = [];

  for (var i = 0; i < controller.DAYS_IN_WEEK; i++) {
    week.push([]);
  }

  Promise.each(week, function(day, index) {
    var date = moment(startDate, 'MM-DD-YYYY')
      .add(index, 'day')
      .format('MM-DD-YYYY');

    return Driver.find({ date: date })
      .then(function(driversForDay) {
        week[index] = driversForDay;
      });

  }).then(function() {
    res.json(week);
  }).catch(function(err) {
    res.status(500).send(err);
  });
};

controller.getAllDrivers = function(req, res) {
  Driver.find({})
    .then(function(drivers) {
      res.json(drivers);
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
}

controller.createDriver = function(req, res) {
  Driver.create({
    name: req.body.name,
    date: req.body.date
  }).then(function() {
    res.sendStatus(200);
  }).catch(function(err) {
    res.status(500).send(err);
  })
};

controller.deleteDriver = function(req, res) {
  Driver.remove({ _id: req.params.id })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
};

// TODO - remove eventually
controller.deleteAllDrivers = function(req, res) {
  Driver.remove({ name: 'alex' })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

module.exports = controller;