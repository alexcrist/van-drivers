(function() {
  'use strict';

  function main() {
    return {
      restrict: 'E',
      templateUrl: '/components/main/mainTemplate.html',
      controller: 'mainController',
      controllerAs: 'ctrl'
    };
  }

  angular.module('main', ['angularMoment']).directive('main', main);
})();