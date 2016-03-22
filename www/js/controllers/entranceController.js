(function() {
  var entranceController = function(
    $state,
    $scope,
    $stateParams,
    popupService
  ) {
    $scope.jumpToMashup = function() {
      $state.transitionTo("tab.mashup");
    };

    $scope.showHowtoPopup = function() {
      popupService.howtoPopup();
    };
  };

  angular
    .module('starter.controllers')
    .controller('EntranceController', entranceController);
})();
