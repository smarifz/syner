'use strict';

angular.module('synerApp')
  .controller('EventInfoCtrl', function ($scope, $routeParams, EventService, UserService) {
    $scope.eventInfo = [];
    

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
          EventService.getEvent($routeParams.id).success(function(data){
          $scope.eventInfo = data;
        })
    }


    $scope.willAttend = function() {
    	
    	UserService.getUser().success(function(data, status, headers) {
        	console.log("user data: "+data);

      });



		console.log("Controller - eventLocation var from UI: "+ $scope.attending);    		
		var data = 
		  {
		      id      	: $routeParams.id,
		      attendee  : user
		  }


    	EventService.willAttend(data).success(function(data, status, headers) {
        	$scope.init(); //Fill table with recent data from DB.
        	console.log("Document updated.");

      });
    } 


  
  });
