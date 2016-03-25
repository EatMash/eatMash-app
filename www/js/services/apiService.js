(function() {
  var apiService = function($http) {
    var MASHUP_AMOUNT = 3;
    var MASHUP_MINRAT = 3;

    var productionApiHost =
      (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) ?
      "http://eatmash.herokuapp.com" : "";

    var mashup = function(query) {
      return $http({
        method: "GET",
        url: "/api",
        params: {
          location: query,
          minrat: MASHUP_MINRAT,
          num: MASHUP_AMOUNT
        }
      });
    };

    var mashupAgain = function(query, current_mashups) {
      return $http({
        method: "POST",
        url: "/api/new",
        data: {
          location: query,
          minimum_rating: MASHUP_MINRAT,
          uuids: current_mashups
        }
      });
    };

    var confirm = function(current_mashups) {
      return $http({
        method: "POST",
        url: "/api/confirm",
        data: {
          uuid: current_mashups
        }
      });
    };

    return {
      fetchMashup: function(data) {
        return mashup(data);
      },
      mashupAgain: function(query, current_mashups) {
        return mashupAgain(query, current_masups);
      },
      mashupConfirm: function(current_mashups) {
        return confirm(current_mashups);
      }
    };
  };

  angular
    .module("starter")
    .factory("apiService", apiService);
})();
