"use strict";
(function() {
  angular
    .module('shipmateapp')
    .factory('GoogleAuth', ['$http', '$location', function($http, $location) {
      let GoogleAuth = {}
      const clientId = '600096885677-g29tqgs658lqsdrh5tcpqkhcip1b4v81.apps.googleusercontent.com';
      const scope = 'email https://www.googleapis.com/auth/gmail.readonly';
      const redirectUri = 'http://localhost:3000/gmailauth/';
      const responseType = 'token';
      const url = 'https://accounts.google.com/o/oauth2/auth?scope=' +
      scope + '&client_id=' + clientId + '&redirect_uri=' + redirectUri +
      '&response_type=' + responseType;

      GoogleAuth.login = function() {
        window.location.replace(url);
      };

      return GoogleAuth;
    }]);
})();
