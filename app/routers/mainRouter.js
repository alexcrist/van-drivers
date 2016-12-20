'use strict';

var express = require('express'),
    mainController = require('../controllers/mainController');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

router.route('/drivers')
  .post(mainController.createDriver);

router.route('/drivers/all')
  .get(mainController.getAllDrivers)
  .delete(mainController.deleteAllDrivers);

router.route('/drivers/:id')
  .delete(mainController.deleteDriver);

router.route('/drivers/week/:startDate')
  .get(mainController.getDriversByWeek);



module.exports = router;

