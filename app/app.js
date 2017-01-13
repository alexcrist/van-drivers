'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    slack = require('@slack/client'),
    bodyParser = require('body-parser'),
    driverRouter = require('./routers/driverRouter');

// Start up the application
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(driverRouter);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Connect to MongoDB
var mongoUri = process.env.MONGODB_URI || '';
console.log('Connecting to MongoDB at ' + mongoUri);
mongoose.Promise = Promise;
mongoose.connect(mongoUri);
