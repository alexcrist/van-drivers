'use strict';

var express = require('express'),
    mainController = require('../controllers/mainController');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

router.route('/drivers/week/:monday')
  .get(mainController.getDriversByWeek);

module.exports = router;

