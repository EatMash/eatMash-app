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
      popupService.placePromptPopup(function(text) {
        if (text) {
          $state.go("tab.mashup", { place: text });
        }
      });
    };

    $scope.showHowtoPopup = function() {
      popupService.howtoPopup();
    };
  };

  angular
    .module('starter.controllers')
    .controller('EntranceController', entranceController);
})();
