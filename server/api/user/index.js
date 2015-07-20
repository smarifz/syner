'use strict';

var express = require('express');
var controller = require('./user.controller');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var router = express.Router();

router.get('/get', auth, controller.index);
router.get('/get/:id', controller.show);
router.post('/add', controller.create);
router.put('/update/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/delete/:id', controller.destroy);

module.exports = router;