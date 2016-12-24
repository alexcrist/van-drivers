'use strict';

var moment = require('moment'),
    Promise = require('bluebird'),
    slackController = require('./slackController'),
    Driver = require('../models/Driver');

var DAYS_IN_WEEK = 7;

var controller = {
  getDriversByWeek: getDriversByWeek,
  getAllDrivers: getAllDrivers,
  createDriver: createDriver,
  deleteDriver: deleteDriver,
  deleteAllDrivers: deleteAllDrivers
};

// Gets all drivers in a week starting at the given day
function getDriversByWeek(req, res) {
  var startDate = req.params.startDate,
      week = [];

  for (var i = 0; i < DAYS_IN_WEEK; i++) {
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
}

// Gets all drivers
function getAllDrivers(req, res) {
  Driver.find({})
    .then(function(drivers) {
      res.json(drivers);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

// Creates a new driver with the given name and date
function createDriver(req, res) {
  var driver = {
    name: req.body.name,
    date: req.body.date
  }

  Driver.create(driver)
    .then(function() {
      slackController.driverCreated(driver);
      res.status(200).send(driver);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send(err);
    });
}

// Deletes a driver by the given ID
function deleteDriver(req, res) {
  Driver.findByIdAndRemove(req.params.id)
    .then(function(driver) {
      slackController.driverDeleted(driver);
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

// Deletes all drivers
function deleteAllDrivers(req, res) {
  Driver.remove({})
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

module.exports = controller;
