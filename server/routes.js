/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  var errors = require('./components/errors');
  var User = require('./api/user');
  var Event = require('./api/event');
  var express = require('express');
  var jwt = require('express-jwt');
  var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


  app.use('/api/users', User);

  app.use('/api/events', Event);

  //LOGIN ///////////////////////
  app.post('/api/login', function(req, res, next){

      // if (!req.param.username) return res.sendStatus(400);

    console.log(req.body);

    if(!req.param.username || !req.param.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    User.username = req.param.username;
    user.setPassword(req.param.password)
    user.save(function (err){
        if(err){ return next(err); }

    console.log("route.js /api/login - User named \""+req.param.username+"\" signed into the application.");

      return res.json({token: user.generateJWT()})
    });



     res.send(200);


  });

  //REGISTER ///////////////////////
  app.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password)
    user.save(function (err){
      if(err){ return next(err); }

      return res.json({token: user.generateJWT()})
    });
  });

  // app.use('/api/login', function(req, res) {

  //       console.log("/api/login - User named \""+req.body.userName+"\" signed into the application.");
  //       // render the page and pass in any flash data if it exists


  //       res.send(200);
  //   });


  // app.use('/api/logout', function(req, res) {

  //       console.log("/api/login - User with "+req.body.userName+" signed out the application.");
  //       // render the page and pass in any flash data if it exists

  //       res.send(200);
  //   });

  
  // // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
