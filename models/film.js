var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var filmSchema = Schema({
	eTitle: {
		type: String,
		index:true
	},
	vTitle:{
		type: String
	},
	reDate: {
		type: String
	},
	summ: {
		type: String
	},
	category: {
		type: String
	},
	cast: {
		type: String
	},
	director: {
		type: String
	},
	duration:{
		type: String
	},
	id_index:{
		type: String
	},
	trailer:{
		type: String
	},
	imagePath:{
		type: String
	},
	price:{
		type: Number, default:3
	},
	bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

var Film = module.exports = mongoose.model('Film', filmSchema, 'films');

module.exports.addFilm = function(newFilm, callback){
	        newFilm.save(callback);
	 
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}