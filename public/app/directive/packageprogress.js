"use strict";
(function() {
  angular
    .module('shipmateapp')
    .directive('packageProgress', ['$compile', function($compile) {
      return {
        scope: {
          packagedata: '=packageData'
        },
        link: function(scope, element) {
          let html = '<table class="progress-table-' + scope.packagedata.service + '"><tr class="header-' + scope.packagedata.service + '"><th>Date</th><th>Activity</th><th>Location</th></tr>';
          let count = 0;
          for (let progress of scope.packagedata.progress) {
            const date = moment(progress.timestamp).format('M/D');
            html += '<tr class="progress-row' + count + '"><td class="progress-date"><h5>' + date +
                    '</h5></td><td class="progress-info"><h5>' + progress.details +
                    '</h5></td><td class="progress-location"><h5>' + progress.location.replace(/([0-9])/g, '') +
                    '</h5></td></tr>';
            count = count === 0 ? 1 : 0;
          }
          html += '</table>';
          element.append(html);
        }
      }
    }]);
})();
