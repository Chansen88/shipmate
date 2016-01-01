"use strict";
(function() {
  angular
    .module('shipmateapp')
    .directive('packageDelivery', function() {
      return {
        template: '<img ng-if="packagedata.delivered" ng-src="/img/delivered.png"/>' +
                  '<img ng-if="!packagedata.delivered" ng-src="/img/oneday.png"/>' +
                  '<h6>{{packagedata.whenDelivered}}</h6>'
      }
    });
})();
