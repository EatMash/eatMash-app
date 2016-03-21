(function() {
  var restaurantDetailController = function($scope, $stateParams) {

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("tab.mashup");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('RestaurantDetailCtrl', restaurantDetailController);
})();
