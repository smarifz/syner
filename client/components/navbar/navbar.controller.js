'use strict';

angular.module('synerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
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