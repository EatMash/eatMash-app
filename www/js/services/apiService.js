(function() {
  var apiService = function($http, appConfigs) {
    var mashup = function() {
      // call mashup API
    };

    return {
      fetchMashup: function() {
        return fetchMashup();
      }
    };
  };

  angular
    .module("starter")
    .factory("apiService", apiService);
})();
