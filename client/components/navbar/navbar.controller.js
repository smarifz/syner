'use strict';

angular.module('synerApp')
  .controller('NavbarCtrl', function ($scope, $location, AuthService) {

    $scope.isLoggedIn = AuthService.isLoggedIn;
    // console.log('Nav bar login called AuthService.isLoggedIn()');
    $scope.currentUser = "";
    $scope.logOut = AuthService.logOut;
    var loginTitle;
    var loginLink;
    var showLogin = new showLoginContext();
      
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Users',
      'link': '/users'
    }, {
      'title': 'Events',
      'link': '/events'
    },{
      'title': 'Leagues',
      'link': '/leagues'
    },{
      'title': showLogin.showLoginTitle(), //Fancy way of showing title. Easy way would have been to just put 'Logout'
      'link': showLogin.showLoginLink() //Fancy way of showing link. Easy way would have been to just put '/logout'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.getCurrentUser = function(){
      if(AuthService.isLoggedIn)
        $scope.currentUser = AuthService.currentUser();
    }

    //Using inner functions to determine if the link and title show 'Login' or 'Logout'
    function showLoginContext(){

      this.showLoginLink = function(){
        if(AuthService.isLoggedIn){
          loginLink = "/logout";
          return loginLink
        }
        else{ 
          loginLink = "/login";
          return loginLink;
        }
      }

      this.showLoginTitle = function(){
        if(AuthService.isLoggedIn){
          loginTitle = "Logout";
          return loginTitle
        }
        else{ 
          loginTitle = "Login";
          return loginTitle;
      }
      }
    }




  });