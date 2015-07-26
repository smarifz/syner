'use strict';

angular.module('synerApp')
  .controller('EventInfoCtrl', function ($scope, $routeParams, EventService, UserService, AuthService) {
    $scope.eventInfo = [];
    $scope.isCollapsed = false;
    var isAttend = $scope.isAttending = false;
    $scope.attendingStatus = "Attend";


    

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
          EventService.getEvent($routeParams.id).success(function(data){
          $scope.eventInfo = data;
          $scope.getAttendingStatus();
          // console.log(data);
        })
    }


    //Add an event /////////////////////////////////////////////////////////////////////
    $scope.addEvent = function() {
      var data = 
          {
              name      : $scope.eventName,
              location  : $scope.eventLocation,
              date      : $scope.eventDate,
              attendees : $scope.eventTotalAttnds
          }

      // console.log("addEvent data: "+data);
      console.log(data);
      EventService.addEvent(data)
        .success(function(data, status, headers) {
        $scope.reloadAllEventsTable();//Fill table with recent data from DB. Function in events.controller.js
        $scope.clearFields(); //Clear input fields

      });
      
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
              $scope.isAttending = true;
              $scope.attendingStatus = "Not Attending"; //Status reversed to show proper option on UI
            	$scope.init(); //Fill table with recent data from DB.
            	console.log("Document updated.");

          });
    }

    $scope.willNotAttend = function() {
        //Get current user logged in
        var user = AuthService.currentUser();
        var data = 
          {
              id        : $routeParams.id,
              attendee  : user
          }

        //Sent user information to be added to Event document
        EventService.willNotAttend(data).success(function(data, status, headers) {
              $scope.isAttending = false;
              $scope.attendingStatus = "Attend"; //Status reversed to show proper option on UI
              $scope.init(); //Fill table with recent data from DB.
              console.log("Document updated.");

          });
    }

    //Helps trigger the proper action if the button is clicked
    $scope.attendingBridge = function() {
        if($scope.isAttending)
          $scope.willNotAttend();
        else
          $scope.willAttend();
    }

    $scope.isEmpty = function(str) {
      return (!str || 0 === str.length);
    }

    $scope.getAttendingStatus = function(){
          EventService.getEvent($routeParams.id).success(function(data){
          console.log(data.attendees);

          if($scope.isEmpty(data.attendees)){
            $scope.attendingStatus == "Attend";
          }

          if(data.attendees.forEach(function(names){
            console.log(names);
            if(names == AuthService.currentUser()){
              $scope.isAttending = true;
              console.log("user exists.");
              $scope.attendingStatus = "Not Attend";

            }
            else{
              $scope.attendingStatus = "Attend";
              $scope.isAttending = false;
            }
          })
            ){}
        })

    }

    $scope.reciprocal = function(){

        if($scope.attendingStatus == "Attend")
          return "Not Attending";
        else ($scope.attendingStatus == "Not Atend")
          return "Attending"

    }

        //Clear input fields /////////////////////////////////////////////////////////////////////
    $scope.clearFields = function(){
       $scope.eventName = "";
       $scope.eventLocation = "";
       $scope.eventDate = "";
       $scope.eventTotalAttnds = "";
    }

  
  });
