var Booking = require('../../models/booking');
var User = require('../../models/user');
var Film = require('../../models/film');
var Seat = require('../../models/seat');
module.exports.createBooking = (req, res) => {
  req.body.map(i => {
    const { cinema, date, time, seatID, film } = i;
    const user = req.user;
    const booking = new Booking({ cinema, date, time, seatID, film });
    Film.findOne({ id_index: film })
      .exec(function (err, film) {
        if (err) console.log(err);
        booking.user =  user;
        booking.film = film;
        booking.email = req.user.email;
        booking.filmName = film.vTitle;
        Film.findOne({id_index:i.film},(err,docs)=>{
          booking.price = parseInt(docs.price);
        })
        booking.save();
        console.log(booking);

        Seat.findOneAndUpdate({ seatCode: booking.seatID }, { isBooked: true }, () => { });
        User.update({ _id: user._id }, { $push: { bookings: booking } }, () => { });
        Film.update(film, { $push: { bookings: booking } }, () => { });
      })
  })
  Booking.find({ email: req.user.email }, (err, docs) => {
    if (err)
      console.log(err);
    res.json(docs);
  });


}
module.exports.getUserBookings = function (req, res) {
  console.log(req.user.email);
  var data = Booking.find({ email: req.user.email }).select({
    date: 1,
    _id: 0,
    seatID: 1,
    cinema: 1,
    email: 1,
    filmName: 1,
    bookingDate: 1,
    time:1
  }).sort('-bookingDate').limit(10);
  data.exec((err, docs) => {
    res.json(docs);
  })
  // console.log(data);
  // res.json(data);

}