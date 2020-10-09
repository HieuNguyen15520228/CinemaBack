var express = require('express');
var router = express.Router();

var Film = require('../models/film');
// Get Homepage
router.post('/add', function(req,res){

	var filmName = req.param('filmName');
	var reDate = req.param('reDate');
	var summ = req.param('summ');
	var category = req.param('category');
	var cast = req.param('cast');
	var director = req.param('director');

	// req.checkBody('filmName', 'Name film is required').notEmpty();
	// req.checkBody('reDate', 'Release is required').notEmpty();
	// req.checkBody('category', 'Category is required').notEmpty();
	Film.findOne({ filmName: { "$regex": "^" + filmName + "\\b", "$options": "i" }}, function (err, film) {
		if (film) {
			res.render('/', {
				film: film
			});
		}
		else {
			var newFilm = new Film({
				filmName: filmName,
				reDate: reDate,
				summ: summ,
				category: category,
				cast:cast,
				director: director
			});
			Film.addFilm(newFilm, function (err, film) {
				if (err) throw err;
				res.json(newFilm);
			});
		}
	});
});
router.get('/action', function(req,res){
	Film.findOne({ category:{ "$regex": "*" + "Action, Adventure, Sci-Fi"}},function(err,film){
		res.json(film);
	});
})
module.exports = router;