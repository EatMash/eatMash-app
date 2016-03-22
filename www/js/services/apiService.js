(function() {
  var apiService = function($http) {
    var MASHUP_AMOUNT = 3;
    var MASHUP_MINRAT = 3;

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

    return {
      fetchMashup: function(data) {
        return mashup(data);
      }
    };
  };

  angular
    .module("starter")
    .factory("apiService", apiService);
})();
