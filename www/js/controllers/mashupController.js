(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $ionicPlatform,
    $ionicPopup,
    $document,
    apiService,
    popupService
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

    // NOTE:
    // For Android device, we need to specifify enableHighAccuract to true
    // in order to make it work.
    // (Ref: http://mori-coding.blog.jp/archives/8071251.html)
    var obtainGeolocationData = function() {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var currentPosition =
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(currentPosition);
      }, function(err) {
        popupService.geoErrorPopup();
        console.log(err);
      }, {
        enableHighAccuracy: true,
        timeout: 5000
      });
    };

    // Obtain mashup data from API server
    var doMashup = function(query, callback) {
      apiService.fetchMashup(query).then(function(response) {
        callback(true, response.data);
      }, function(callback) {
        callback(false, []);
      });
    };

    // Set place markers on Google Map
    var setPlaceMarkers = function(data) {

    };

    $document.ready(function() {
      if (!navigator.geolocation) {
        popupService.geoNotFoundPopup();
      }

      // Render GoogleMap
      renderGoogleMap();

      // Obtain GPS information
      obtainGeolocationData();

      // Render markers
      doMashup(function(isSuccess, data) {
        if (isSuccess) {
          // TODO: Alert users that app got an error in fetching API.
          return
        }

        setPlaceMarkers(data);
      });
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
