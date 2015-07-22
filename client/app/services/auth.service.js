angular.module('synerApp')
.service('AuthService', ['$http','$q','$window',function ($http, $q, $window) {
    var auth = {};


    var saveToken = function (token){
        $window.localStorage['SECRET'] = token;
    };

    var getToken = function (){
        return $window.localStorage['SECRET'];
    }

    var isLoggedInRequest = function(){
        var token = getToken();
        // console.log("auth.service.js isLoggedInRequest - Token: "+token);

        if(token == 'undefined'){
        console.log("Token is undefined");
        return false;
        }

        if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
        } else {
        return false;
        }
    };

    var getToken = function (){
        return $window.localStorage['SECRET'];
    }

    var currentUserRequest = function(){
        // console.log("Calling isLoggedInRequest from currentUserRequest");
        if(isLoggedInRequest()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.username;
        }
    };

    //REGISTER /////////////////////////////
    var registerRequest = function(userName, passWord){
    // console.log("auth.service.js registerRequest - Username: "+userName+" Password: "+passWord);
      
      return $http.post('/register', { username: userName, password: passWord }).success(function(data){
        saveToken(data.token);
      });
    };



    //LOGIN /////////////////////////////
    var logInRequest = function(userName, passWord){
        // console.log("auth.service.js logInRequest - Username: "+userName+" Password: "+passWord);
        // var password = "paSSword";

        // var data = { username: userName, password: password };

        return $http.post('/login', { username: userName, password: passWord })
            .success(function (data, status, headers, config) {
                saveToken(data.token);
                console.log("auth.service.js logIn success. Token: "+data.token);
            });
    };

    var logOutRequest = function(){
      $window.localStorage.removeItem('SECRET');
      console.log("User logged out. Token removed from localStorage.");
    };


    
    return {
        logIn: function(userName, passWord) { return logInRequest(userName, passWord); },
        logOut: function() { return logOutRequest(); },
        isLoggedIn : function() { return isLoggedInRequest(); },
        currentUser : function() { return currentUserRequest(); },
        register : function(userName, password) { return registerRequest(userName, password); }

    };
}]);