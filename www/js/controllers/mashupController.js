(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $document,
    $ionicPlatform,
    apiService
  ) {
    $document.ready(function() {
      var mapRenderArea = $("#map").get(0);

      // Render GoogleMap
      $scope.map = new google.maps.Map(mapRenderArea, {
        styles: [
          {
            featureType: "poi",
            stylers: [{
              visibility: "off"
            }]
          }
        ],
        center: { lat: -34, lng: 150 },
        disableDefaultUI: true,
        zoom: 8
      });

      //
      // TODO: Render markers
      //
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
