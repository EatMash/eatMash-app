(function() {
  var mashupController = function($scope, $state, $rootScope, $ionicPlatform) {

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("entrance");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('MashupCtrl', mashupController);
})();
