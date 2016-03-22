(function() {
  var $injects = ['ionic', 'starter.controllers', 'LocalStorageModule'];

  var runCallback = function($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova &&
          window.cordova.plugins &&
          window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      // org.apache.cordova.statusbar required
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      // Set some variables
      $rootScope.variables = {
        GOOGLE_MAP_KEY: "AIzaSyBFUvGx2qh79-roeTMbdpemOpckp0OVt3A"
      }
    });
  }

  // Create controller module
  angular
    .module('starter.controllers', [])

  // Create a main app module
  angular
    .module('starter', $injects)
    .run(runCallback);
})();
