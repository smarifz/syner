angular.module('synerApp')
.service('AuthService', ['$http','$q','$window',function ($http, $q, $window) {
    var auth = {};



    var saveToken = function (token){
        $window.localStorage['flapper-news-token'] = token;
    };

    var getToken = function (){
        return $window.localStorage['flapper-news-token'];
    }

    var isLoggedInRequest = function(){
        var token = getToken();
        console.log("auth.service.js isLoggedInRequest - Token: "+token);

        if(token == 'undefined'){
        console.log("Token is undefined");
        return false;
        }

        if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        // var payload = window.atob(window.localStorage[token].split('.')[1]);
        return payload.exp > Date.now() / 1000;
        } else {
        return false;
        }
    };

    var getToken = function (){
        return $window.localStorage['flapper-news-token'];
    }

    var currentUserRequest = function(){
        console.log("Calling isLoggedInRequest from currentUserRequest");
        if(isLoggedInRequest()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            // var payload = window.atob(window.localStorage[token].split('.')[1])
            return payload.username;
        }
    };

    //REGISTER /////////////////////////////
    var registerRequest = function(username){
      return $http.post('/api/register', { username: username }).success(function(data){
        saveToken(data.token);
      });
    };

    //LOGIN /////////////////////////////
    var logInRequest = function(userName){
        console.log("auth.service.js logInRequest - Username: "+userName);
        var password = "paSSword";

        // var data = { username: userName, password: password };

        return $http.post('/api/login', { username: userName, password: password })
            .success(function (data, status, headers, config) {
                saveToken(data.token);
                console.log("auth.service.js logInRequest success");
            });
    };

    var logOutRequest = function(){
      $window.localStorage.removeItem('flapper-news-token');
      console.log("User logged out. Token removed from localStorage.");
    };


    
    return {
        logIn: function(userName) { return logInRequest(userName); },
        logOut: function() { return logOutRequest(); },
        isLoggedIn : function() { return isLoggedInRequest(); },
        currentUser : function() { return currentUserRequest(); },
        register : function() { return registerRequest(); }

    };

    // var userInfo;
    // var loggedIn = false;

    // function login(userName, password) {
    //     var deferred = $q.defer();

    //     $http.post("/api/login", { userName: userName, password: password })
    //         .then(function (result) {
    //             userInfo = {
    //                 accessToken: result.data.access_token,
    //                 userName: result.data.userName
    //             };

    //             loggedIn = true;
    //             $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
    //             deferred.resolve(userInfo);

    //         }, function (error) {
    //             deferred.reject(error);
    //         });

    //     return deferred.promise;
    // }

    // function logout() {
    //     var deferred = $q.defer();

    //     $http({
    //         method: "POST",
    //         url: "/api/logout",
    //         headers: {
    //             // "access_token": userInfo.accessToken
    //         }
    //     }).then(function (result) {
    //         userInfo = null;
    //         loggedIn = false;
    //         $window.sessionStorage["userInfo"] = null;
    //         deferred.resolve(result);
    //     }, function (error) {
    //         deferred.reject(error);
    //     });

    //     return deferred.promise;
    // }

    // function getUserInfo() {
    //     return userInfo;
    // }

    

    // function isLoggedIn(){
    //   return loggedIn;
    // }

    // function init() {
    //     if ($window.sessionStorage["userInfo"]) {
    //         userInfo = JSON.parse($window.sessionStorage["userInfo"]);
    //     }
    // }
    // init();

    // return {
    //     login: login,
    //     logout: logout,
    //     getUserInfo: getUserInfo,
    //     isLoggedIn : isLoggedIn
    // };
}]);