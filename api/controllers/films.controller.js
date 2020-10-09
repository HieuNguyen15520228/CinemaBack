var Film = require('../../models/film');

module.exports.addFilm = function (req, res) {
	var filmName = req.body.filmName.trim();
	var reDate = req.body.reDate.trim();
	var summ = req.body.summ.trim();
	var category = req.body.category.trim();
	var cast = req.body.cast.trim();
	var director = req.body.director.trim();
	// req.checkBody('filmName', 'Name film is required').notEmpty();
	// req.checkBody('reDate', 'Release is required').notEmpty();
	// req.checkBody('category', 'Category is required').notEmpty();
	Film.findOne({ filmName: { "$regex": "^" + filmName + "\\b", "$options": "i" } }, function (err, film) {
		if (film) {
			res.json('Existed');
		}
		else {
			var newFilm = new Film({
				filmName: filmName,
				reDate: reDate,
				summ: summ,
				category: category,
				cast: cast,
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
module.exports.searchCategory =  (req, res) => {
	Film.find({ category: { "$regex": "\\b" + req.params.category + "\\b", "$options": "i" } }, function (err, film) {
		res.json(film);
	});
}
module.exports.getListFilm = async (req, res) => {
	console.log('Get Film List');
	var filmList = await Film.find({}).select({
		imagePath: 1,
		eTitle: 1,
		vTitle: 1,
		reDate: 1,
		summ: 1,
		category: 1,
		cast: 1,
		director: 1,
		id_index: 1,
		duration: 1,
		trailer: 1,
		price:1,
		_id: 0
	})
	res.json(filmList);
}
module.exports.getFilm = (req, res) => {
	Film.findOne({ id_index: req.params.id }, function (err, film) {
		var data = {
			"imagePath": film.imagePath,
			"eTitle": film.eTitle,
			"vTitle": film.vTitle,
			"reDate": film.reDate,
			"summ": film.summ,
			"category": film.category,
			"cast": film.cast,
			"director": film.director,
			"id_index": film.id_index,
			"duration": film.duration,
			"trailer": film.trailer,
			"price":film.price,
		}
		res.json(data);
		//Chưa bắt lỗi
	});
}
module.exports.delFilm = function (req, res) {
	Film.findOne({ filmName: { "$regex": "\\b" + req.params.filmname + "\\b", "$options": "i" } }, function (err, film) {
		if (!film) {
			// req.flash('error', 'No account with that email address exists.');
			// return res.redirect('/forgot');
			return res.json("No film with that name exists.");
		}
		Film.deleteOne({ filmName: req.params.filmname }, function (err) { })
		res.json('Deleted');
	})
}
module.exports.searchFilm = (req, res) => {
	console.log(req.params.filmname);
	Film.find({
		vTitle: {
			"$regex": "\\b" + req.params.filmname + "\\b", "$options": "i"
		}
	}, (err, film)=> {
		if (!film) {
			// req.flash('error', 'No account with that email address exists.');
			// return res.redirect('/forgot');
			return res.json("No film with that name exists.");
		}
		res.json(film);
	})
}
module.exports.getPrice = async (req, res) => {
	// var total = 0;
	// for (var key in req.body) {
	// 	if (req.body.hasOwnProperty(key)) {
	// 		item = req.body[key];
	// 		Film.findOne({ id_index: item.film }).select({ price: 1 }).exec((err, docs) => {
	// 			item.price = docs.price;
	// 			data.push(item);
	// 		})
	// 	}
	// }
	// console.log(data);
// req.body.map(i => {
// 		Film.findOne({ id_index: i.film }).select({ price: 1 }).exec((err, docs) => {
// 			total =total + docs.price;
// 		})
// 	})
// 	console.log(total);
	
	// res.json(data)




	// res.json(res);
}