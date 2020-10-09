var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config/URL_config')
mongoose.connect(config.MDB_URL);
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var films = require('./routes/films');
var apiUsers = require('./api/routes/user.route');
var apiFilms = require('./api/routes/film.route');
var bookingRoutes = require('./api/routes/booking.route');
var apiSeats = require('./api/routes/seat.route' );
var apiPayment = require('./api/routes/payment.route');
var apiContact = require('./api/routes/contact.route')
// Init App
var app = express();
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(passport.initialize());
require('./passport-jwt/passport')(passport);
// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout:'layout'}));
// app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
/*app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));*/

// Passport init

//app.use(passport.session());
app.use('/api/films',apiFilms);
app.use('/api/users',apiUsers);
// app.use('/api/v1/films', apiFilms);
app.use('/api/bookings', bookingRoutes);
app.use('/api/seats',apiSeats);
app.use('/api/payment', apiPayment)
app.use('/api/contact',apiContact)
// Express Validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

// Connect Flash
app.use(flash());

// Global Vars
/*app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});*/



// app.use('/', function (req, res) {
//     res.render('index');
// });
app.use('/users', users);
app.use('/films', films);

// Set Port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});