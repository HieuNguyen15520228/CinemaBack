var Booking = require('../../models/booking');
var User = require('../../models/user');
var Film = require('../../models/film');
var Seat = require('../../models/seat');
// module.exports.seatBooking = (req, res) => {
//   const { date, time, price, seatID, film } = req.body;
//   const user = req.user;
//   const booking = new Booking({ date, time, price, seatID });
//   Film.findById(film._id)
//     .exec(function (err, foundSlot) {
//       if (err) throw err;
//       booking.user = user;
//       booking.film = foundSlot;
//       console.log(foundSlot);
//       console.log(booking.seatID);
//       booking.save();
//       Seat.findOneAndUpdate({ seatID:booking.seatID }, {isBooked:true}, function (error, doc) { });
//       User.update({ _id: user._id }, { $push: { bookings: booking } }, function () { });
//       return res.json({ date: booking.date, time: booking.time, price: booking.price, film: booking.film, seatID: booking.seatID });
//     })

// }
module.exports.getSeats = (req, res) => {
//   const user = res.user;
//   Booking
//     .where({ user })
//     .populate('film')
//     .exec(function (err, foundBookings) {
//       if (err) {
//         return res.status(422).send();
//       }
//       return res.json(foundBookings);
//     });
    var data = Seat.find((err, seat) =>  {
        res.json(seat);
    })
    

}