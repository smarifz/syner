'use strict';

var express = require('express');
var controller = require('./event.controller');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET'});
var router = express.Router();

router.get('/get', auth, controller.index);
router.get('/get/:id', auth, controller.show);
router.post('/add', auth, controller.create);
router.put('/update/:id', auth, controller.update);
router.patch('/:id', auth, controller.update);
router.delete('/delete/:id', auth, controller.destroy);

module.exports = router;