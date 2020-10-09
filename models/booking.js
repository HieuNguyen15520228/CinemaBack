const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  date: { type: Date},
  price: {type:Number,default:3},
  seatID: { type: String },
  cinema: {type:String},
  email:{
    type: String
  },
  filmName:{
    type: String
  },
  time:{
    type: String
  },
  bookingDate: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  film: { type: Schema.Types.ObjectId, ref: 'Film'}
});


module.exports = mongoose.model('Booking', bookingSchema)