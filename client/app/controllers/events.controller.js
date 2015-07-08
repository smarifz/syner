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


    // $scope.init = function() {
    //     $http.get('/api/events/get').success(function(allEvents) {
    //     $scope.allEvents = allEvents;
    //   });
    // } 

    // $scope.addEvent = function() {
    //   if($scope.eventName === '') {
    //     return;
    //   }
      
    //   console.log("name "+ $scope.eventName+ " venue: "+ $scope.eventVenue );

    //   //Sends all the data to http factory which calls the API
    //   $http({
    //       url: '/api/events/add',
    //       method: "POST",
    //       data: 
    //       {
    //           name      : $scope.eventName,
    //           location  :$scope.eventLocation,
    //           date      : $scope.eventDate,
    //           attendees : $scope.eventTotalAttnds
    //       }
    //   })
    //   .then(function(response) {
    //     // success
    //     console.log("Post successful. New Event Added.");
    //     // referesh allEvent table with new entered events
    //     $scope.init();
    //   }, 
    //   function(response) { // optional
    //     // failed
    //     console.log("Post Failed. .");

    //   });

    //    $scope.eventName = '';
    //    $scope.eventVenue = '';


    // };

    // $scope.deleteEvent = function(event) {
    //   $http.delete('/api/events/' + event._id);
    // };
  });
