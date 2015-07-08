//Service for getting and setting data into MongoDB via API.
angular.module('synerApp')
  .service('EventService', ['$http', function($http) {

    var getEventsRequest = function() {
      		return $http.get('/api/events/get');
    	}


    var getEventRequest = function(id) {
      		return $http.get('/api/events/get/'+id);
    	}


    //   //Sends all the data to http factory which calls the API
    
    var addEventRequest = function(eventData){
      $http({
	          url: '/api/events/add',
	          method: "POST",
	          data: 
	          {
	              name      : eventData.name,
	              location  : eventData.location,
	              date      : eventData.date,
	              attendees : eventData.attendees
	          }
	      })
	      .then(function(response) {
	        // success
	        console.log("Post successful. New Event Added.");
	        // referesh allEvent table with new entered events
	      }, 
	      function(response) { // optional
	        // failed
	        console.log("Post Failed. .");

	      });
  		}


	var deleteEventRequest = function(event){

		$http.delete('/api/events/delete' + event._id).then(function(response){
			console.log("Event deleted.")

		});
	}


	
	//All the returned methods for this service.
	return {
      		getEvent: function(id) { return getEventRequest(id); },
      		getEvents: function() { return getEventsRequest(); },
      		addEvent: function(eventData) { return addEventRequest(eventData); }


		};


  }]);