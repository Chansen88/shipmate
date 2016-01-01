'use strict';
(function() {
  angular
    .module('shipmateapp')
    .controller('MainController',
      ['$scope', '$http', '$location', 'GoogleAuth',
        function($scope, $http, $location, GoogleAuth) {
          console.log('Path: ' + $location.path());
          let vm = this;
          vm.login = function() {
            GoogleAuth.login();
          };
        }]);
})();
