(function() {
  'use strict';

  function mainController($scope, $http) {
    var self = this;

    self.nextWeek = nextWeek;
    self.prevWeek = prevWeek;
    self.createDriver = createDriver;
    self.deleteDriver = deleteDriver;
    self.range = range;

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
      var monday = moment().add(3, 'day').startOf('isoweek');
      loadWeek(monday);
    }

    function loadWeek(startDay) {
      for (var i = 0; i < self.week.length; i++) {
        self.week[i].date = startDay.format('MM-DD-YYYY');
        startDay.add(1, 'day');
      }
      getDrivers();
    }

    function prevWeek() {
      var prevMonday = moment(self.week[0].date, 'MM-DD-YYYY')
        .subtract(1, 'week');
      loadWeek(prevMonday);
    }

    function nextWeek() {
      var nextMonday = moment(self.week[0].date, 'MM-DD-YYYY')
        .add(1, 'week');
      loadWeek(nextMonday);
    }

    function getDrivers() {
      self.driverPlaceholder = 'Loading...';
      $http.get('/drivers/week/' + self.week[0].date)
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
      console.log(err);
    }

    function createDriver(date) {
      $http.post('/drivers', {
        name: 'alex', 
        date: date
      }).then(getDrivers)
        .catch(console.log);
    }

    function deleteDriver() {

    }

    function range(n) {
      var array = new Array(n);
      for (var i = 0; i < n; i++) {
        array[i] = i;
      }
      return array;
    }
  }

  angular.module('main').controller('mainController', mainController);
})();