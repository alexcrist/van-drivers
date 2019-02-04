'use stict';

var slack = require('@slack/client');

var TOKEN = process.env.SLACK_TOKEN || '',
    CHANNEL = 'van-drivers',
    WEB_CLIENT = new slack.WebClient(TOKEN);

var controller = {
  message: message,
  driverCreated: driverCreated,
  driverDeleted: driverDeleted
};

// Sends a Slack message on the controller's channel with the given text
function message(text) {
  var options = {
    channel: CHANNEL,
    text,
    as_user: true
  };

  WEB_CLIENT.chat.postMessage(options)
    .then(function(res) {
      console.log('Slack message sent! ' + res);
    })
    .catch(function(err) {
      console.log('Slack error! ' + err);
    });
};

// Sends a Slack message indicating that a driver has been created
function driverCreated(driver) {
  message('*' + driver.name + '* is driving on *' + driver.date + '*!');
}

// Sends a Slack message indicating that a driver has been deleted
function driverDeleted(driver) {
  message('*' + driver.name + '* is *no longer* driving on *' + driver.date 
    + '*.');
}

module.exports = controller;