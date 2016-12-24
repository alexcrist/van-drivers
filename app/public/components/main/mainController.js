(function() {
  'use strict';

  function mainController($scope, $http) {
    var self = this;

    self.init = init;
    self.nextWeek = nextWeek;
    self.prevWeek = prevWeek;
    self.createDriver = createDriver;
    self.deleteDriver = deleteDriver;
    self.array = array;

    // Reference for each day as to which driver was most recently clicked
    self.selectedDriver = [];
    
    self.week = [
      {
        name: 'Mon',
        numDrivers: 2
      },
      {
        name: 'Tues',
        numDrivers: 1
      },
      {
        name: 'Wed',
        numDrivers: 1
      },
      {
        name: 'Thurs',
        numDrivers: 2
      }
    ];

    init();

    function init() {
      self.today = moment();
      var monday = self.today.add(3, 'day').startOf('isoweek');
      loadWeek(monday);
    }

    function loadWeek(startDay) {
      for (var i = 0; i < self.week.length; i++) {
        self.week[i].date = moment(startDay);
        startDay.add(1, 'day');
      }
      getDrivers();
    }

    function prevWeek() {
      var prevMonday = self.week[0].date.subtract(1, 'week');
      loadWeek(prevMonday);
    }

    function nextWeek() {
      var nextMonday = self.week[0].date.add(1, 'week');
      loadWeek(nextMonday);
    }

    function getDrivers() {
      self.driverPlaceholder = 'Loading...';
      $http.get('/drivers/week/' + self.week[0].date.format('MM-DD-YYYY'))
        .then(getDriversSuccess)
        .catch(getDriversFailure);
    }

    function getDriversSuccess(res) {
      self.driverPlaceholder = '<none>';
      for (var i = 0; i < self.week.length; i++) {
        self.week[i].drivers = res.data[i];
      }
    }

    function getDriversFailure(err) {
      self.driverPlaceholder = 'Error!';
      statusFailure('Failed to get drivers. ' + err.status);
      console.log(err);
    }

    function createDriver(name, date) {
      if (!name || !date) {
        statusFailure('Invalid name!');
        return;
      }

      $http.post('/drivers', {
        name: name, 
        date: date.format('MM-DD-YYYY')
      }, {
        'Content-Type': 'application/json'
      }).then(createDriverSuccess)
        .catch(createDriverFailure);
    }

    function createDriverSuccess(res) {
      statusSuccess('Saved new driver: ' + res.data.name);
      self.statusFailure = '';
      getDrivers();
    }

    function createDriverFailure(err) {
      statusFailure('Failed to create driver. ' + err.status);
      console.log(err);
    }

    function deleteDriver(driver) {
      $http.delete('/drivers/' + driver._id)
        .then(deleteDriverSuccess)
        .catch(deleteDriverFailure);
    }

    function deleteDriverSuccess() {
      statusSuccess('Driver appointment successfully deleted.');
      getDrivers();
    }

    function deleteDriverFailure(err) {
      statusFailure('Failed to delete driver. ' + err.status);
      console.log(err);
    }

    function statusSuccess(str) {
      self.statusSuccess = str;
      self.statusFailure = '';
    }

    function statusFailure(str) {
      self.statusSuccess = '';
      self.statusFailure = str;
    }

    function array(n) {
      return new Array(n);
    }
  }

  angular.module('main').controller('mainController', mainController);
})();