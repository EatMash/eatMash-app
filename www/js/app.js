(function() {
  var $injects = ['ionic', 'starter.controllers', 'LocalStorageModule'];

  var runCallback = function($ionicPlatform) {
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
    });
  }

  // Create controller module
  angular
    .module('starter.controllers', []);

  // Create a main app module
  angular
    .module('starter', $injects)
    .run(runCallback);

  // Set variables
  angular
    .module('starter')
    .constant("appConfigs", {
      API_SERVER: "http://eatmash.herokuapp.com/"
    });
})();
