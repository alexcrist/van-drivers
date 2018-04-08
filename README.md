# van-drivers

> Web application for scheduling van drivers for the Northeastern Climbing Team.

![Application demo](demo.gif)

## Technologies

- Server framework: `Node.js`
- Request routing: `Express`
- Database: `MongoDB`
- Front end: `AngularJS`*

*An updated front end written with `React` and `Redux` can be found [here](https://github.com/alexcrist/van-drivers-react-redux).*

## Features

- Ability to schedule and remove van drivers stored in MongoDB
- Slack integration for notifications when drivers are added or removed
- Pagination through weeks of drivers

## Local Developement

#### Requirements

- `Node (6.11.2)`
- `NPM (3.10.10)`

#### Install Dependencies

`npm install`

#### Set Up MongoDB

- [Start up a local MongoDB instance](https://scotch.io/tutorials/an-introduction-to-mongodb)
- Set the `MONGODB_URI` environment variable'
  - `export MONGODB_URI=mongodb://localhost`
  
#### Set Up Slack Integration (optional)

- Make or already have a Slack team
- Login to your team online
- Navigate to 'Build a Custom Integration' (https://[YOUR-TEAM-NAME].slack.com/apps/build/custom-integration)
- Click 'Bots'
- Name your bot and click 'Add bot integration'
- Copy your API Token (something like "xoxb-123BLAHBLAHBLAH")
- Create or already have a channel called "van-drivers"
- Add your bot to this channel
- Set the `SLACK_TOKEN` environment variable
  - `export SLACK_TOKEN=[YOUR-TOKEN]`

#### Start the Application

- `npm start`
- Go to `localhost:5000` in a browser
