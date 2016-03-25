(function() {
  var apiService = function($http) {
    var MASHUP_AMOUNT = 3;
    var MASHUP_MINRAT = 3;

    var productionApiHost =
      (!!window.cordova) ?
      "http://eatmash.herokuapp.com" : "";

    var mashup = function(query) {
      return $http({
        method: "GET",
        url: productionApiHost + "/api",
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
        url: productionApiHost + "/api/new",
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
        url: productionApiHost + "/api/confirm",
        data: {
          uuids: current_mashups
        }
      });
    };

    return {
      fetchMashup: function(data) {
        return mashup(data);
      },
      mashupAgain: function(query, current_mashups) {
        return mashupAgain(query, current_mashups);
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
