(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $ionicPlatform,
    $ionicPopup,
    $document,
    apiService
  ) {
    var renderGoogleMap = function() {
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
    };

    var geoErrorPopup = function() {
      var ERROR_TEXT =
        "Failed to obtain geolocation data. "+
        "Please check if the GPS is turned on";

      $ionicPopup.alert({
        title: "Error",
        template: ERROR_TEXT
      });
    };

    var obtainGeolocationData = function() {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var currentPosition =
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(currentPosition);
      }, function(err) {
        geoErrorPopup();
        console.log(err);
      });
    };

    $document.ready(function() {
      if (!navigator.geolocation) {
        // TODO
        // Notify users that this app cannot work
      }

      // Render GoogleMap
      renderGoogleMap();

      // Obtain GPS information
      obtainGeolocationData();

      // TODO: Render markers
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
