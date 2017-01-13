# van-drivers
Web application for scheduling van drivers for climbing team practices.

Built using the MEAN stack for deployment with Heroku. Has Slack integration for driver notifications.

![Application demo](demo.gif)

## Features
- Save/delete van drivers in a Mongo database
- Scroll through mutliple weeks of practice
- Get slack notifications when drivers are added or removed
- Customize # practice days or # van drivers per day in the front-end code

## Run locally on macOS

### Get Homebrew to install stuff: http://brew.sh

### Install this stuff if you don't have it
- MongoDB `brew install mongodb`
- Node / NPM `brew install node`
- Git `brew install git`

### Clone this repository to your computer
`git clone https://github.com/alexcrist/van-drivers.git`

### Start up MongoDB locally
- Navigate to the van-drivers folder in Terminal `cd [PATH_TO_VAN-DRIVERS]/van-drivers`
- Make a directory to store your MongoDB files `mkdir data`
- Start up MongoDB `mongod --dbpath=data`

### Run the application locally
- In a new Terminal window, navigate to the van-drivers folder
- Install bower globally with `npm install -g bower`
- Install Node modules with `npm install`
- Run `export MONGO_URI=mongodb://localhost` to tell the app where to connect to MongoDB
- (Optional) Set up Slack integration
- Start up the app with `node app/app.js`
- Visit the app in a browser at "localhost:5000"

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
- Add Gulp and a linter

## Bugs
- Save and delete input fields switch before the dialog closes upon saving/deleting a driver