(function() {
  var entranceController = function(
    $state,
    $scope,
    $stateParams,
    $ionicPopup
  ) {
    HOW_THIS_WORK =
      "<p>EatMash helps you to enjoy local foods for your trip. "+
      "This app randomly mashes up local cuisine restaurants near "+
      "your place and suggest breakfast, lunch, and dinner that fit "+
      "you the most!";

    $scope.jumpToMashup = function() {
      $state.transitionTo("tab.mashup");
    };

    $scope.showHowtoPopup = function() {
      $ionicPopup.alert({
        title: "How this work",
        template: HOW_THIS_WORK
      });
    };
  };

  angular
    .module('starter.controllers')
    .controller('EntranceController', entranceController);
})();
