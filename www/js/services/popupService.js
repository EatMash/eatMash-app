(function() {
  var popupService = function($ionicPopup) {
    var geoError = function() {
      var ERROR_TEXT =
        "Failed to obtain geolocation data. "+
        "Please check if the GPS is turned on";

      $ionicPopup.alert({
        title: "Error",
        template: ERROR_TEXT
      });
    };

    return {
      geoErrorPopup: function() {
        return geoError();
      }
    };
  };

  angular
    .module("starter")
    .factory("popupService", popupService);
})();
