angular.module('synerApp')
  .controller('AuthCtrl', function ($scope, $location, AuthService) {


  $scope.init = function(){
      if(AuthService.isLoggedIn()){
        console.log("User logged in");
            $location.path("/");
        }
    }

  $scope.register = function(){
    AuthService.register($scope.reg.username, $scope.reg.passWord).error(function(error){
      $scope.error = error;
    }).then(function(){
      $location.url('/');
    });
  };

  $scope.logIn = function(){
      console.log("auth.controller.js login- userName: "+$scope.login.username + " password: "+$scope.login.passWord);

    AuthService.logIn($scope.login.username, $scope.login.passWord).then(function(){
      $location.url('/');
      // AuthService.saveToken(data)
    });
  };

  $scope.logout = function () {
    AuthService.logOut();

};
})