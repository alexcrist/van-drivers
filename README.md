# van drivers
MEAN stack Heroku app for scheduling van drivers for climbing team practices.

![alt tag](demo.gif)

## Features
- Save/delete van drivers in a Mongo database
- Scroll through mutliple weeks of practice
- Get slack notifications when drivers are added or removed
- Customize # practice days or # van drivers per day in the front-end code

## Run locally
I'll assume your command line language is Bash

### Get this stuff
- MongoDB
- Node / NPM

### Do this stuff
- Clone this application to your computer
- In a console window, run `mongod` to start up a local MongoDB (you may have to specify a directory to save stuff)
- In a new window, navigate to this app's base directory `cd [PATH-TO-REPO]/van-drivers`
- Install necessary NPM packages with `npm install`
- After this finishes, bower packages will automatically be installed
- Run `export MONGO_URI=mongodb://localhost` to specify the URI of your MongoDB
- (Optional) Set up Slack integration stuff (See next section)
- Run your app with `node app/app.js`
- Open up the app in a browser at "localhost:5000"!

### Slack integration
- Make or already have a Slack team
- Login to your team online
- Navigate to 'Build a Custom Integration' (https://[YOUR-TEAM-NAME].slack.com/apps/build/custom-integration)
- Click 'Bots'
- Name your bot and click 'Add bot integration'
- Copy your API Token (something like "xoxb-123BLAHBLAHBLAH")
- Create or already have a channel called "van-drivers"
- Add your bot to this channel
- In a console window, set this token as an environment variable with `export SLACK_TOKEN=[YOUR-TOKEN]`
- Proceed with further instructions above

## To Do
- Add Grunt and a linter

## Bugs
- Save and delete input fields switch before the dialog closes upon saving/deleting a driver