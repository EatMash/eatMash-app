(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $window,
    $ionicPlatform
  ) {
    $ionicPlatform.ready(function() {
      var mapRenderArea = $("#map");
      console.log(mapRenderArea);
    });

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("entrance");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('MashupCtrl', mashupController);
})();
