var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../../models/user');
var userController = require('../controllers/users.controller');

// Register User
router.post('/register', userController.register);
router.put('/update/:username', passport.authenticate('jwt', { session: false }), userController.changePass);
router.post('/login', userController.Login);
// router.get('/logout', function (req, res) {
// 	req.logout();
// 	res.json("Logout Successfully");
// 	// req.flash('success_msg', 'You are logged out');

// 	// res.redirect('/');
// });
router.put('/updateinfo', passport.authenticate('jwt', { session: false }), userController.changeInfo);

router.post('/logout',passport.authenticate('jwt', { session: false }),userController.logOut);
router.get('/checktoken',passport.authenticate('jwt', { session: false }),userController.checkToken);
// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.json('Require login');
// 	}
// }
router.post('/forgot', userController.sendMailToken);
// router.get('/reset/:token', function(req, res) {
// 	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
// 		if (!user) {
//       // req.flash('error', 'Password reset token is invalid or has expired.');
//       // return res.redirect('/forgot');
//       return res.json('Password reset token is invalid or has expired.')
//   }
//   res.json('Use method post this link to continue to change pass');
//     // res.render('reset', {
//     //   user: req.user
//     // });
// });
// });
router.post('/reset/:token', userController.resetPassword);
router.delete('/del/:username',userController.delAccount);
router.put('/edit/:username', passport.authenticate('jwt', { session: false }), userController.edit);
module.exports = router;