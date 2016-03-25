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
    $scope.markersData = [];
    $scope.isMashupConfirmed = false;

    $scope.addressStringify = function(array) {
      var text = "";
      for (i in array) {
        text += (" " + array[i]);
      }
      return text;
    };

    $scope.focusMarker = function(place) {
      var marker =
        _.find($scope.markersData, function(d) { return d.id === place.uuid; });
      marker && marker.focus();
    }

    $scope.isBreakfast = function(i) { return (i === 0); };
    $scope.isLunch = function(i) { return (i === 1); };
    $scope.isDinner = function(i) { return (i === 2); };

    $scope.mealTypeString = function(i) {
      switch (i) {
        case 0: return "Breakfast";
        case 1: return "Lunch";
        case 2: return "Dinner";
        default:;
      }
    }

    $scope.mashupAgain = function() {
      var uuids = []

      $scope.places.forEach(function(place) {
        uuids.push(place.uuid);
      });

      /*
      apiService.mashupAgain(query, uuids)
        .success(function(response) {
          // Success handling
        }).error(function(response) {
          // Error handling
        });
      */
    };

    $scope.mashupConfirm = function() {
      var uuids = []

      $scope.places.forEach(function(place) {
        uuids.push(place.uuid);
      });

      apiService.mashupConfirm(uuids)
        .success(function(response) {
          $scope.isMashupConfirmed = true;
        }).error(function(response) {
          // TODO Handle error
        });
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

      $scope.markersData.length = 0;

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

        var focusMarker = function() {
          info.open($scope.map, marker);
        };

        marker.addListener('click', focusMarker);

        $scope.markersData.push({
          id: d.uuid,
          marker: marker,
          focus: focusMarker
        });
      });
    };

    var setPlaceList = function(data) {
      $scope.places = data;
    };

    $document.ready(function() {
      $ionicLoading.show({
        templateUrl: "mashupPopup.html"
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
          popupService.netErrorPopup();
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
