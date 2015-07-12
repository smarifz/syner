'use strict';

angular.module('synerApp')
.controller("LoginCtrl", ["$scope", "$location", "$window", "authenticationSvc",function ($scope, $location, $window, authenticationSvc) {
	
	$scope.userInfo = null;
	$scope.usernameStorage = "nobody";


    $scope.init = function(){
    	if(authenticationSvc.isLoggedIn())
    		$location.path("/");
    }

    $scope.login = function () {
        authenticationSvc.login($scope.userName, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;

                //usernameStore is null because result is not passing anything back from the api call.
                //once User model is set then this will work 
                $scope.usernameStorage = result.userName;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };

    $scope.logout = function () {
    console.log($scope.usernameStorage);

      authenticationSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                // $location.path("/login");
            }, function (error) {
                console.log(error);
            });
        };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };

    $scope.getUserName = function(){
    	return $scope.usernameStorage;
    }



}]);
