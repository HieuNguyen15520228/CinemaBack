var mongoose = require('mongoose');

var seatSchema = mongoose.Schema({
	seatID: {
		type: String
    },
    seatRow:{
        type: String
    },
    isBooked: {
        type: Boolean
    },
    seatCode:{
        type: String
    }
});
var Seat = module.exports = mongoose.model('Seat', seatSchema);

