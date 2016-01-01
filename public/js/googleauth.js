var googleUser = {};
var startApp = function() {
  gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
      client_id: '600096885677-g29tqgs658lqsdrh5tcpqkhcip1b4v81.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'email https://www.googleapis.com/auth/gmail.readonly'
    });
    attachSignin(document.getElementById('customBtn'));
  });
};
function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        document.getElementById('name').innerText = "Signed in: " +
            googleUser.getBasicProfile().getName();
            console.log(googleUser);
            console.log(document.vm);
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
}
