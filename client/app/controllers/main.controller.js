'use strict';

angular.module('synerApp')
.controller("MainCtrl",function ($scope, $location, $window, AuthService) {

	console.log(AuthService.currentUserRequest);

});
