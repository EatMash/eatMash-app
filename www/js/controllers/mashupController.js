(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $document,
    $ionicPlatform
  ) {
    $document.ready(function() {
      var mapRenderArea = $("#map");
      // TODO render Google map here
    });

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("entrance");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('MashupController', mashupController);
})();
