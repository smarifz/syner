//Service for getting and setting data into MongoDB via API.
angular.module('synerApp')
  .service('UserService', ['$http', 'auth', function($http, $auth) {

  	$scope.isLoggedIn = auth.isLoggedIn;


    var getUsersRequest = function() {
      		return $http.get('/api/users/get');
    	}


    var getUserRequest = function(id) {
      		return $http.get('/api/users/get/'+id);
    	}


    //Sends all the data to http factory which calls the API
    var addUserRequest = function(userData){
      return $http({
	          url: '/api/users/add',
	          method: "POST",
	          data: 
	          {
	              name      : userData.name,
	              password 	: userData.password,
	              role	    : userData.role

	          }
	      });
	}


	var deleteUserRequest = function(user){

		$http.delete('/api/users/delete' + user._id).then(function(response){
			console.log("User deleted.")

		});
	}


	
	//All the returned methods for this service.
	return {
      		getUser: function(id) { return getUserRequest(id); },
      		getUsers: function() { return getUsersRequest(); },
      		addUser: function(userData) { return addUserRequest(userData); }


		};


  }]);