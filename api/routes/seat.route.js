var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('../controllers/users.controller');
var seatController = require('../controllers/seats.controller');

router.get("/",seatController.getSeats);

module.exports = router;

