(function() {
  var views = {
    tabFavourite: {
      templateUrl: 'templates/tab-favourite.html',
      controller: 'FavouriteCtrl'
    },
    tabRestaurantDetail: {
      templateUrl: 'templates/restaurant-detail.html',
      controller: 'RestaurantDetailCtrl'
    },

    mashup: {
      templateUrl: 'templates/tab-mashup.html',
      controller: 'DashCtrl'
     }
  };

  var routingProvider = function($stateProvider, $urlRouterProvider) {
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
        views: { 'tab-favourite': views.tabFavourite }
      })
      .state('tab.restaurant-detail', {
        url: '/restaurants/:id',
        views: { 'restaurant-detail': views.tabRestaurantDetail }
      });
    $urlRouterProvider.otherwise('/tab/mashup');
  };

  angular.module('starter').config(routingProvider);
})();
