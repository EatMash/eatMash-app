(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $ionicPlatform,
    $document,
    apiService
  ) {
    $document.ready(function() {
      if (!navigator.geolocation) {
        // TODO
        // Notify users that this app cannot work
      }

      // Render GoogleMap
      var mapRenderArea = $("#map").get(0);
      $scope.map = new google.maps.Map(mapRenderArea, {
        styles: [
          {
            featureType: "poi",
            stylers: [{
              visibility: "off"
            }]
          }
        ],
        center: { lat: -15, lng: 15 },
        disableDefaultUI: true,
        zoom: 14
      });

      // Obtain GPS information
      navigator.geolocation.getCurrentPosition(function(pos) {
        var currentPosition =
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(currentPosition);
      }, function(err) {
        // TODO: Alert to urge users to turn on geolocation
      });

      // TODO: Render markers
      console.log(apiService);
    });

    // Prevent trigger of history back
    $ionicPlatform.registerBackButtonAction(function() {
      $state.transitionTo("entrance");
    }, 100);
  };

  angular
    .module('starter.controllers')
    .controller('MashupController', mashupController);
})();
