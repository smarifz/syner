'use strict';

angular.module('synerApp')
  .controller('EventListCtrl', function ($scope, EventService) {
    $scope.allEvents = [];

    
    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
        EventService.getEvents()
        .success(function(data, status, headers) {
          $scope.allEvents = data;
        })
    } 


  });
