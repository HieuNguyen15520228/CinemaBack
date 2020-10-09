var Ticket = require('../../models/ticket')

module.exports.addTicket = function(req,res){
	var filmName = req.body.filmName.trim();
	var reDate = req.body.reDate.trim();
	var summ = req.body.summ.trim();
	var category = req.body.category.trim();
	var cast = req.body.cast.trim();
	var director = req.body.director.trim();
	// req.checkBody('filmName', 'Name film is required').notEmpty();
	// req.checkBody('reDate', 'Release is required').notEmpty();
	// req.checkBody('category', 'Category is required').notEmpty();
	Film.findOne({ filmName: {"$regex": "^" + filmName +"\\b", "$options": "i"}}, function (err, film) {
		if (film) {
			res.json('Existed');
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
				//res.json(newFilm);
				res.json(newFilm);
			});
		}
	});
};