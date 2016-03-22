(function() {
  var ERROR_TEXT =
   "Failed to obtain geolocation data. "+
   "Please check if the GPS is turned on";
  var HOW_THIS_WORK =
   "<p>EatMash helps you to enjoy local foods for your trip. "+
   "This app randomly mashes up local cuisine restaurants near "+
   "your place and suggest breakfast, lunch, and dinner that fit "+
   "you the most!";

  var popupService = function($ionicPopup) {
    var howto = function() {
      return $ionicPopup.alert({
        title: "How this work",
        template: HOW_THIS_WORK
      });
    };

    var geoError = function() {
      return $ionicPopup.alert({
        title: "Error",
        template: ERROR_TEXT
      });
    };

    return {
      howtoPopup: function() {
        return howto();
      },
      geoErrorPopup: function() {
        return geoError();
      }
    };
  };

  angular
    .module("starter")
    .factory("popupService", popupService);
})();
