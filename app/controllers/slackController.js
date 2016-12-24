'use stict';

var slack = require('@slack/client');

var token = process.env.SLACK_TOKEN || '',
    web = new slack.WebClient(token);

var controller = {
  message: message,
  driverCreated: driverCreated,
  driverDeleted: driverDeleted
};

function message(text) {
  var channel = 'van-drivers',
      options = {
        as_user: true
      };

  web.chat.postMessage(channel, text, options)
    .then(function(res) {
      console.log('Slack message sent! ' + res);
    })
    .catch(function(err) {
      console.log('Slack error! ' + err);
    });
};

function driverCreated(driver) {
  message('*' + driver.name + '* is driving on *' + driver.date + '*!');
}

function driverDeleted(driver) {
  message('*' + driver.name + '* is *no longer* driving on *' + driver.date 
    + '*.');
}

module.exports = controller;