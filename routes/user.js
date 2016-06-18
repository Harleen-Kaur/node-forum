
var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');
var home = require('../views/main/home');

router.get('/',function(req,res){
	res.render('/');
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/home',
	failureRedirect: '/home',
	failureFlash: true
}));

router.get('/signup', function(req, res, next){
	res.render('accounts/signup',{
		title: 'Sign Up',
		message: req.flash('message')
	});
});

router.post('/signup', function(req, res, next){
	var user = new User();
	console.log(req.body);
	console.log(res);

	user.profile.name.firstname = req.body.firstname;
	user.profile.name.lastname = req.body.lastname;
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.profile.picture = user.gravator();
	

	User.findOne({ username: req.body.username}, function(err, existingUser){
		if(existingUser){
			// res.json({error: 'Account with that username already exists'});
			req.flash('message', 'Account with that username already exists. Please try with another username');
			return res.redirect('/signup');
		} else{
			user.save(function(err, user){
				if(err){
					return next(err);
				}

				req.logIn(user, function(err){
				if(err) return next(err);
				res.redirect('/home');
				})
				// res.json({message: 'Created Successfully'});

			});
		}
	});
});

router.get('/profile', function(req, res, next){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
	// res.json(req.user);
	console.log(req.user);
	if(req.user != null){
		User.findOne({_id: req.user._id}, function(err,user){
			if(err){
				console.log('Error occurred while loading profile');
				return res.redirect('/error');
				// return next(err);
			}

			res.render('accounts/profile', {
				title: 'My Profile',
				message: req.flash('success')
			});
		});
	}
	else{
		req.flash('loginMessage','Your session has been ended. Please login again!!');
		return res.redirect('/home');
	}
});

router.post('/profile', function(req, res, next){
	User.findOne({ _id: req.user._id }, function(err, user){

		if(err){
			return next(err);
		}
		console.log(req.body);
		console.log(user);
		if(req.body.firstname != '')
			user.profile.name.firstname = req.body.firstname;
		if(req.body.lastname != '')
			user.profile.name.lastname = req.body.lastname;

		if(req.body.email != '')
			user.profile.email = req.body.email;


		user.save(function(err){
			if(err){
				return next(err);
			}
			req.flash('success', 'Successfully edited your profile!!');
			return res.redirect('/profile');
		});
	});
});

router.get('/logout', function(req, res, next){
	req.logout();
	req.session.destroy(function (err) {
    res.redirect('home'); //Inside a callback… bulletproof!
  });
	// res.redirect('home');
});


module.exports = router;