'use strict';

angular.module('synerApp')
  .controller('UserCtrl', function ($scope, $http) {
    $scope.allUsers = [];

    $http.get('/api/users').success(function(allUsers) {
      $scope.allUsers = allUsers;
    });

    $scope.addUser = function() {
      if($scope.newUser === '') {
        return;
      }
      $http.post('/api/users', { name: $scope.newUser });
      $scope.newUser = '';
    };

    $scope.deleteUser = function(user) {
      $http.delete('/api/users/' + user._id);
    };
  });
