'use strict';

angular.module('synerApp')
.controller("LoginCtrl", "AuthService", function ($scope, $location, $window, AuthService) {
	
	$scope.userInfo = null;
	$scope.usernameStorage = "nobody";


    $scope.init = function(){
    	if(AuthService.isLoggedIn()){
    		console.log("User logged in");
            $location.path("/");
        }
    }

    $scope.login = function () {
        console.log("login.controller.js login- userName: "+userName);
        AuthService.logIn($scope.username).error(function(error){
          $scope.error = error;
        }).then(function(){
          // $state.go('home');
        });
    };


    $scope.logout = function () {
        AuthService.logOut();

    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };

    $scope.getUserName = function(){
    	return $AuthService.currentUser;
    }



});
