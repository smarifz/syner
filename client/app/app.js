'use strict';

var app = angular.module('synerApp', [
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
        controller: 'MainCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
    })

      .when('/users', {
        templateUrl: 'app/views/users.html',
        controller: 'UserCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      })

      .when('/events', {
        templateUrl: 'app/views/events.html',
        controller: 'EventCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      })

      .when('/events/list', {
        templateUrl: 'app/views/eventList.html',
        controller: 'EventListCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      })

      .when('/eventInfo/:id', {
        templateUrl: 'app/views/eventInfo.html',
        controller: 'EventInfoCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      })

      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl',
      })


      .when('/logout', {
        templateUrl: 'app/views/logout.html',
        controller: 'LoginCtrl',
      });
      // .otherwise({
      //   redirectTo: '/'
      // });

    $locationProvider.html5Mode(true);
  });

app.run(["$rootScope", "$location", function ($rootScope, $location) {

  // console.log("routeChangeSuccess ")

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        // console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);