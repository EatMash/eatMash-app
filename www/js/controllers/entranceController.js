(function() {
  var entranceController = function($state, $scope, $stateParams) {
    $scope.jumpToMashup = function() {
      $state.transitionTo("tab.mashup");
    };

    $scope.showHowtoPopup = function() {
      console.log("Howto");
    };
  };

  angular
    .module('starter.controllers')
    .controller('EntranceController', entranceController);
})();
