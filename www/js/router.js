(function() {
  var views = {
    favourite: {
      templateUrl: 'templates/tab-favourite.html',
      controller: 'FavouriteCtrl'
    },

    mashup: {
      templateUrl: 'templates/tab-mashup.html',
      controller: 'MashupCtrl'
    },

    restaurantDetail: {
      templateUrl: 'templates/restaurant-detail.html',
      controller: 'RestaurantDetailCtrl'
    }
  };

  var routingProvider = function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('entrance', {
        url: '/',
        templateUrl: 'templates/entrance.html',
        controller: 'EntranceController'
      });

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.mashup', {
        url: '/mashup',
        views: { 'tab-mashup': views.mashup }
      })
      .state('tab.favourite', {
        url: '/favourite',
        views: { 'tab-favourite': views.favourite }
      });

    $urlRouterProvider.otherwise('/');
  };

  angular.module('starter').config(routingProvider);
})();
