'use strict';

angular.module('synerApp')
  .controller('EventCtrl', function ($scope, EventService) {
    $scope.allEvents = [];

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
        EventService.getEvents()
        .success(function(data, status, headers) {
          $scope.allEvents = data;
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

      console.log("addEvent data: "+data);
      EventService.addEvent(data)
        .success(function(data, status, headers) {
        $scope.init(); //Fill table with recent data from DB.
        $scope.clearFields(); //Clear input fields

      });
      
    }

    //Get an Event via ID/////////////////////////////////////////////////////////////////////
    $scope.getEvent = function(id) {

      EventService.getEvent(id).success(function(data){
        console.log("Event added.");
      });
      
    };


    //Delete an Event /////////////////////////////////////////////////////////////////////
    $scope.deleteEvent = function(event) {
      
    };

    //Clear input fields /////////////////////////////////////////////////////////////////////
    $scope.clearFields = function(){
       $scope.eventName = "";
       $scope.eventLocation = "";
       $scope.eventDate = "";
       $scope.eventTotalAttnds = "";
    }

  });
