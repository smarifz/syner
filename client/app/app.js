'use strict';

angular.module('synerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      })

      .when('/users', {
        templateUrl: 'app/views/users.html',
        controller: 'UserCtrl'
      })

      .when('/events', {
        templateUrl: 'app/views/events.html',
        controller: 'EventCtrl'
      })

      .when('/events/list', {
        templateUrl: 'app/views/eventList.html',
        controller: 'EventListCtrl'
      });
      // .otherwise({
      //   redirectTo: '/'
      // });

    $locationProvider.html5Mode(true);
  });