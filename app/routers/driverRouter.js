'use strict';

var express = require('express'),
    driverController = require('../controllers/driverController');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

router.route('/drivers')
  .post(driverController.createDriver);

router.route('/drivers/all')
  .get(driverController.getAllDrivers)
  .delete(driverController.deleteAllDrivers);

router.route('/drivers/:id')
  .delete(driverController.deleteDriver);

router.route('/drivers/week/:startDate')
  .get(driverController.getDriversByWeek);

module.exports = router;
