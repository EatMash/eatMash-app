(function() {
  var mashupController = function(
    $scope,
    $state,
    $rootScope,
    $ionicPlatform,
    $ionicLoading,
    $document,
    apiService,
    popupService
  ) {
    $scope.map = null;
    $scope.places = [];

    $scope.addressStringify = function(array) {
      var text = "";
      for (i in array) {
        text += (" " + array[i]);
      }
      return text;
    };

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
        $ionicLoading.hide();
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
      if (!data.length) {
        // TODO: Alert users that app couldnt mash up any restaurants
        return;
      }

      var posInfo = { lat: null, lng: null };
      data.forEach(function(d) {
        posInfo.lat = d.coordinate.latitude;
        posInfo.lng = d.coordinate.longitude;

        var image = {
          url: d.image_url,
          size: new google.maps.Size(50, 50)
        };

        var infoTemplate = _.template(
          "<div id=\"info-content\">"+
            "<p><b><%= place_name %></b></p>"+
            "<div class=\"address\">"+
              "<%= place_address %>"+
            "</div>"+
            "<div class=\"place_phone\">"+
              "<%= place_phone %>"+
            "</div>"+
          "</div>"
        );
        var rawInfoHtml = infoTemplate({
          place_name: d.name,
          place_address: $scope.addressStringify(d.display_address),
          place_phone: (function() {
            if (d.phone) {
              return '<p>' + d.phone + '</p>';
            } else {
              return null;
            }
          })()
        });

        var info = new google.maps.InfoWindow({
          content: rawInfoHtml
        });

        var marker = new google.maps.Marker({
          position: posInfo,
          map: $scope.map,
          icon: image,
          title: d.name
        });

        marker.addListener('click', function() {
          info.open($scope.map, marker);
        });
      });
    };

    var setPlaceList = function(data) {
      $scope.places = data;
    };

    $document.ready(function() {
      $ionicLoading.show({
        template: "Fetching..."
      });

      if (!navigator.geolocation) {
        $ionicLoading.hide();
        popupService.geoNotFoundPopup();
      }

      // Render GoogleMap
      renderGoogleMap();

      // Obtain GPS information
      obtainGeolocationData();

      // Render markers
      doMashup("soma", function(isSuccess, data) {
        $ionicLoading.hide();
        if (!isSuccess) {
          $ionicLoading.hide();
          // TODO: Alert users that app got an error in fetching API.
          return
        }

        console.log(data);

        setPlaceList(data);
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
