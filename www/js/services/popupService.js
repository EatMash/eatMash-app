(function() {
  var ERROR_TEXT =
    "<p>Failed to obtain geolocation data. "+
    "Please check if the GPS is turned on</p>";
  var HOW_THIS_WORK =
    "<p>EatMash helps you to enjoy local foods for your trip. "+
    "This app randomly mashes up local cuisine restaurants near "+
    "your place and suggest breakfast, lunch, and dinner that fit "+
    "you the most!</p>";
  var GEO_NOT_FOUND =
    "<p>Failed to initiate geolocation interface on your device.</p>";

  var popupService = function($ionicPopup) {
    var howto = function() {
      return $ionicPopup.alert({
        title: "<p><b>How this work</b></p>",
        template: HOW_THIS_WORK
      });
    };

    var geoError = function() {
      return $ionicPopup.alert({
        title: "<p><b>Error</b></p>",
        template: ERROR_TEXT
      });
    };

    var getNotFound = function() {
       return $ionicPopup.alert({
        title: "<p><b>Error</b></p>",
        template: GEO_NOT_FOUND
      });
    }

    return {
      howtoPopup: function() {
        return howto();
      },
      geoErrorPopup: function() {
        return geoError();
      },
      geoNotFoundPopup: function() {
        return geoNotFound();
      }
    };
  };

  angular
    .module("starter")
    .factory("popupService", popupService);
})();
