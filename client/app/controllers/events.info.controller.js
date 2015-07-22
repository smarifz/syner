'use strict';

angular.module('synerApp')
  .controller('EventInfoCtrl', function ($scope, $routeParams, EventService, UserService, AuthService) {
    $scope.eventInfo = [];
    

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
          EventService.getEvent($routeParams.id).success(function(data){
          $scope.eventInfo = data;
          console.log(data);
        })
    }


    $scope.willAttend = function() {
        //Get current user logged in
        var user = AuthService.currentUser();
        var data = 
          {
              id      	: $routeParams.id,
              attendee  : user
          }

        //Sent user information to be added to Event document
      	EventService.willAttend(data).success(function(data, status, headers) {
            	$scope.init(); //Fill table with recent data from DB.
            	console.log("Document updated.");

          });
        } 


  
  });
