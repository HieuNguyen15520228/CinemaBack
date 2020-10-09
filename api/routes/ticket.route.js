var express = require('express');
var router = express.Router();
var ticketController = require('../controllers/tickets.controller');

// Get Homepage
router.post('/add', ticketController.addTicket);
// router.get('/search/category/:category', filmController.searchCategory);
// router.get('/all', filmController.getListFilm);
// router.delete('/del/:filmname',filmController.delFilm);
// router.get('/search/:filmname',filmController.searchFilm);
module.exports = router;