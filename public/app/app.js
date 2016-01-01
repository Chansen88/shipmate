"use strict";
(function() {
  angular
    .module('shipmateapp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/gmailauth', {
            template: '',
            controller: function($location, $rootScope) {
              let hash = $location.hash();
              let splitted = hash.split('&');
              let params = {};
              for (let i = 0; i < splitted.length; i++) {
                let param = splitted[i].split('=');
                let key = param[0];
                let value = param[1];
                params[key] = value;
                $rootScope.accesstoken = params;
              }
              $location.hash('');
              $location.path('/packages');
            }
          })
          .when('/', {
            templateUrl: '/app/partials/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
          })
          .when('/packages', {
            templateUrl: '/app/partials/packages.html',
            controller: 'PackagesController',
            controllerAs: 'vm'
          });
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
      }]);
})();
