/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.use('/api/users', require('./api/user'));

  app.use('/api/events', require('./api/event'));

  app.use('/api/login', function(req, res) {

        console.log("/api/login - User named \""+req.body.userName+"\" signed into the application.");
        // render the page and pass in any flash data if it exists


        res.send(200);
    });


  app.use('/api/logout', function(req, res) {

        console.log("/api/login - User with "+req.body.userName+" signed out the application.");
        // render the page and pass in any flash data if it exists

        res.send(200);
    });

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
