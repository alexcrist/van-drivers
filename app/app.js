'use strict';

var express = require('express'),
    cors = require('cors'),
    http = require('http'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    slack = require('@slack/client'),
    bodyParser = require('body-parser'),
    router = require('./router');

// Start up the application
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Connect to MongoDB
var mongoUri = process.env.MONGODB_URI || '';
console.log('Connecting to MongoDB at ' + mongoUri);
mongoose.Promise = Promise;
mongoose.connect(mongoUri);

// Ping site every 5 minutes to keep Heroku free dyno awake
var FIVE_MINUTES = 300000;
setInterval(function() {
  http.get('http://van-drivers.herokuapp.com');
}, FIVE_MINUTES);