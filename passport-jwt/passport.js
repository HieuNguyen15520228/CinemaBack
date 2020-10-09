var config = require('./config.js');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JWTStrategy(opts, function (jwt_payload, done) { 
        User.findOne({ email: jwt_payload.email }, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    }));
};
   