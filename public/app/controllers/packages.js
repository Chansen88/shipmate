'use strict';
const ipc = require('ipc');
(function() {
  angular
    .module('shipmateapp')
    .controller('PackagesController',
      ['$scope', '$http', '$rootScope', 'Packages', '$location', 'GoogleAuth', '$timeout',
        function($scope, $http, $rootScope, Packages, $location, GoogleAuth, $timeout) {
          var vm = this;
          vm.requestStatus = Packages.requestStatus;
          if (!$rootScope.accesstoken) {
            $location.path('/');
          }
          vm.packageinfo = Packages.packageInfo;
          Packages.getEmailList($rootScope.accesstoken.access_token);

          vm.gmailauth = function() {
            GoogleAuth.login();
          };

          vm.refresh = function() {
            Packages.addPackages();
          };

          vm.autoRefresh = function() {
            Packages.addPackages();
            console.log('running');
            var timer = $timeout(vm.autoRefresh, 90000);
          }

          vm.openPackageUrl = function(id, service) {
            ipc.send('toggle-package-view', JSON.stringify({id, service}));
          };

          $timeout(vm.autoRefresh, 90000);

        }]);
})();
