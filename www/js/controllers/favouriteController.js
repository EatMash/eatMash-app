(function() {
  var favouriteController = function(
    $scope,
    $state,
    $ionicPlatform
  ) {

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("entrance");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('FavouriteCtrl', favouriteController);
})();
