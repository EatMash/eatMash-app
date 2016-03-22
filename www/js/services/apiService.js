(function() {
  var apiService = function($http) {
    var mashup = function(query) {
      return $http({
        method: "GET",
        url: "/api",
        params: { location: query }
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
