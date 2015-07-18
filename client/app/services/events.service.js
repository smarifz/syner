//Service for getting and setting data into MongoDB via API.
angular.module('synerApp')
  .service('EventService', ['$http', function($http) {

    //Get all the events 
    var getEventsRequest = function() {
      		return $http.get('/api/events/get');
    	}

    //Get one event using ID
    var getEventRequest = function(id) {
      		return $http.get('/api/user/get/'+id);
    	}


    //Sends all the data to http factory which calls the API
    var addEventRequest = function(eventData){
      return $http({
	          url: '/api/events/add',
	          method: "POST",
	          data: 
	          {
	              name      : eventData.name,
	              location  : eventData.location,
	              date      : eventData.date,
	              attendees : eventData.attendees
	          }
	      });
  	}

  	//Attend an event
	var willAttendRequest = function(data){
      	return $http({
	      url: '/api/events/update/'+data.id,
	      method: "PUT",
	      data: 
	      {
	          $push: { attendees: data.attendee } 
	      }

	  });

	}

	//Delete an event
	var deleteEventRequest = function(event){
		$http.delete('/api/events/delete' + event._id).then(function(response){
			console.log("Event deleted.")

		});
	}

	
	//All the returned methods for this service.
	return {
      		getEvent: function(id) { return getEventRequest(id); },
      		getEvents: function() { return getEventsRequest(); },
      		addEvent: function(eventData) { return addEventRequest(eventData); },
      		willAttend: function (data) {return willAttendRequest(data); }

		};


  }]);