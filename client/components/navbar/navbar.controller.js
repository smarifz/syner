'use strict';

angular.module('synerApp')
  .controller('NavbarCtrl', function ($scope, $location, AuthService) {

    $scope.isLoggedIn = AuthService.isLoggedIn;
    $scope.currentUser = AuthService.currentUser;
    $scope.logOut = AuthService.logOut;
    
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Users',
      'link': '/users'
    }, {
      'title': 'Events',
      'link': '/events'
    },{
      'title': 'Login',
      'link': '/login'
    },{
      'title': 'Logout',
      'link': '/logout'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });