'use strict';

angular.module('synerApp')
  .controller('EventCtrl', function ($scope, EventService) {

    //Local variables
    $scope.allEvents = [];


    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
        $scope.reloadAllEventsTable();
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
