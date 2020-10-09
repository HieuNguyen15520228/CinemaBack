var express = require('express');
var router = express.Router();
var Film = require('../../models/film');
var filmController = require('../controllers/films.controller');
var passport = require('passport')
// Get Homepage
router.post('/add', filmController.addFilm);
router.get('/search/category/:category', filmController.searchCategory);
router.get('/all', filmController.getListFilm);
router.delete('/del/:filmname',filmController.delFilm);
router.get('/search/:filmname',filmController.searchFilm);
router.get('/get/:id',filmController.getFilm);
// router.post('/price',passport.authenticate('jwt', { session: false }),filmController.getPrice);
module.exports = router;