(function() {
  var tabViews = {
    favourite: {
      templateUrl: 'templates/tab-favourite.html',
      controller: 'FavouriteCtrl'
    },
    mashup: {
      templateUrl: 'templates/tab-mashup.html',
      controller: 'MashupCtrl'
    }
  };

  var routingProvider = function($stateProvider, $urlRouterProvider) {
    // pages
    $stateProvider
      .state('entrance', {
        url: '/',
        templateUrl: 'templates/entrance.html',
        controller: 'EntranceController'
      })
      .state('restaurant-detail', {
        url: '/restaurant/:id',
        templateUrl: 'templates/restaurant-detail.html',
        controller: 'RestaurantDetailCtrl'
      });

    // Tabs
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.mashup', {
        url: '/mashup',
        views: { 'tab-mashup': tabViews.mashup }
      })
      .state('tab.favourite', {
        url: '/favourite',
        views: { 'tab-favourite': tabViews.favourite }
      });

    $urlRouterProvider.otherwise('/');
  };

  angular.module('starter').config(routingProvider);
})();
