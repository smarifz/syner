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
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]}      
      })


      .when('/users', {
        templateUrl: 'app/views/users.html',
        controller: 'UserCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]} 
      })

      .when('/events', {
        templateUrl: 'app/views/events.html',
        controller: 'EventCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]}
      })

      .when('/leagues', {
        templateUrl: 'app/views/leagues.html',
        controller: 'UserCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]} 
      })



      .when('/addEvent', {
        templateUrl: 'app/views/addEvent.html',
        controller: 'EventCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]}
      })

      .when('/events/list', {
        templateUrl: 'app/views/eventList.html',
        controller: 'EventListCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]}
      })

      .when('/eventInfo/:id', {
        templateUrl: 'app/views/eventInfo.html',
        controller: 'EventInfoCtrl',
        resolve: {
          auth: ["$q", "AuthService", function($q, AuthService) {
          var isUserLoggedIn = AuthService.isLoggedIn();
          if(isUserLoggedIn){
            console.log("User Logged in");
            return $q.when(isUserLoggedIn);
          }else{
            console.log("ERROR - No User Logged in");
            return $q.reject({ authenticated: false });
          }
        }]}
      })

      .when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'UserCtrl'
      })

      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'AuthCtrl'

      })


      .when('/logout', {
        templateUrl: 'app/views/logout.html',
        controller: 'AuthCtrl',
      })

      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });

app.run(["$rootScope", "$location", function ($rootScope, $location) {

  console.log("routeChangeSuccess ")

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        // console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            console.log("Error occured. Now in routeChangeError");
            $location.path("/login");
        }
    });
}]);



//HTTP Interceptor intercepts any HTTP calls made to backend. We use JWT to declare the header with token given to us at login. 
app.factory('myHttpResponseInterceptor',['$q','$location', '$window',function($q,$location,$window){
   return {
       'request': function (config) {
           config.headers = config.headers || {};
           

           if ($window.localStorage['SECRET']) {
               config.headers.Authorization = 'Bearer ' + $window.localStorage['SECRET'];
           }
           // console.log('httpProvider token: '+$window.localStorage['SECRET']);

           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/login');
           }
           return $q.reject(response);
       }
   };
}]);

//Http Intercpetor to check auth failures for xhr requests
app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);


//Filter used to capitalize first letter of a string
app.filter('capitalize', function() {
  return function(input, scope) {
    if(input == null)
      return;
    if (input!=null)
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

