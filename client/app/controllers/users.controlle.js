'use strict';

angular.module('synerApp')
  .controller('UserCtrl', function ($scope, UserService) {
    $scope.allUsers = [];

    //Initialize /////////////////////////////////////////////////////////////////////
    $scope.init = function() {
        UserService.getUsers()
        .success(function(data, status, headers) {
          $scope.allUsers = data;
          console.log($scope.allUsers);

        })
    } 

    //Add an event /////////////////////////////////////////////////////////////////////
    $scope.addUser = function() {
      var data = 
          {
              name      : $scope.username,
              password  : $scope.password,
              role      : $scope.userRole
          }

      console.log("addEvent data: "+data);
      UserService.addUser(data)
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
       $scope.userName = "";
       $scope.password = "";
       $scope.userRole = "";
    }

  });
