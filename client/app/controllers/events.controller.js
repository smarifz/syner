'use strict';

angular.module('synerApp')
  .controller('EventCtrl', function ($scope, EventService, AuthService) {

    //Local variables
    $scope.allEvents = [];


    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
        $scope.reloadAllEventsTable();
        $scope.clearFields();
    } 

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.reloadAllEventsTable = function() {
        EventService.getEvents()
        .success(function(data, status, headers) {
          $scope.allEvents = data;
        })
    } 



    //Get an Event via ID/////////////////////////////////////////////////////////////////////
    $scope.getEvent = function(id) {

      EventService.getEvent(id).success(function(data){
        console.log("Event retrieved.");
      });
      
    };

    $scope.willAttend = function(eventid) {

        //Get current user logged in
        var user = AuthService.currentUser();
        var data = 
          {
              id        : eventid,
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

    $scope.willNotAttend = function(eventid) {
        //Get current user logged in
        var user = AuthService.currentUser();
        var data = 
          {
              id        : eventid,
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

    //Delete an Event /////////////////////////////////////////////////////////////////////
    $scope.deleteEvent = function(event) {
      
    };

    //Clear input fields /////////////////////////////////////////////////////////////////////
    $scope.clearFields = function(){
       // $scope.eventName = "";

    }
  });
