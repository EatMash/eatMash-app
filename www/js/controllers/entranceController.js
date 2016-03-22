(function() {
  var entranceController = function(
    $state,
    $scope,
    $ionicPlatform,
    popupService
  ) {
    $ionicPlatform.registerBackButtonAction(function() {
      ionic.Platform.exitApp();
    }, 100);

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
