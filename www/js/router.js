(function() {
  var tabViews = {
    favourite: {
      templateUrl: 'templates/tab-favourite.html',
      controller: 'FavouriteController'
    },
    feed: {
      templateUrl: 'templates/tab-feed.html',
      controller: 'FeedController'
    },
    mashup: {
      templateUrl: 'templates/tab-mashup.html',
      controller: 'MashupController'
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
        controller: 'RestaurantDetailController'
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
      .state('tab.feed', {
        url: '/feed',
        views: { 'tab-feed': tabViews.feed }
      })
      .state('tab.favourite', {
        url: '/favourite',
        views: { 'tab-favourite': tabViews.favourite }
      });

    $urlRouterProvider.otherwise('/');
  };

  angular.module('starter').config(routingProvider);
})();
