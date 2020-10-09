var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('../controllers/users.controller');
var bookingController = require('../controllers/booking.controller');

//router.post('',UserCtrl.UserBook, BookingCtrl.createBooking);
router.post('/', passport.authenticate('jwt', { session: false }),bookingController.createBooking);
router.get('/history' ,passport.authenticate('jwt', { session: false }),bookingController.getUserBookings);

module.exports = router;

