(function() {
  'use strict';

  function mainController($http) {
    var self = this;

    init();

    function init() {
      self.monday = moment().add(3, 'day').startOf('isoweek').format('MM-DD-YYYY');
      getDrivers();
    }

    function getDrivers() {
      $http.get('/drivers/week/' + self.monday)
        .then(function(data) {
          console.log('success');
          console.log(data);
        })
        .catch(function(err) {
          console.log('error');
        });
    }

    self.editDriver = function(day, slotNumber) {
      
    }

    self.updateDriver = function(day, slotNumber, name) {

    }
  }

  angular.module('main').controller('mainController', mainController);
})();