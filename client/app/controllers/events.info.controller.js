'use strict';

angular.module('synerApp')
  .controller('EventInfoCtrl', function ($scope, $routeParams, EventService) {
    $scope.eventInfo = [];

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
          EventService.getEvent($routeParams.id).success(function(data){
          $scope.eventInfo = data;
        })
    } 

  
  });
