angular.module('synerApp')
  .controller('AuthCtrl', function ($scope, $location, AuthService) {

  $scope.userName = {};

  $scope.register = function(){
    AuthService.register($scope.userName).error(function(error){
      $scope.error = error;
    }).then(function(){
      $location.url('/');
    });
  };

  $scope.logIn = function(){
      console.log("login.controller.js login- userName: "+$scope.userName);

     // var loginData = $scope.appForm.data; 

    AuthService.logIn($scope.userName).error(function(error){
      $scope.error = error;
    }).then(function(){
      $location.url('/login');
    });
  };
})