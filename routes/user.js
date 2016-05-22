
var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/',function(req,res){
	res.render('/');
});
router.get('/home',function(req,res){
	res.render('main/home',{
    title: 'Home',
    message: req.flash('loginMessage')
  });
});
// router.get('/login', function(req, res){
// 	if (req.user) return redirect('/');
// 	res.render('main/home', { message: req.flash('loginMessage')});
// });

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/home',
	failureFlash: true
}));

router.get('/profile', function(req, res, next){
	// res.json(req.user);
	console.log(req.user);
	if(typeof user === 'undefined'){
		req.flash('error','Please login again!!');
		return res.redirect('/home');
	}
	User.findOne({_id: req.user._id}, function(err,user){
		if(err)
			return next(err);

		res.render('accounts/profile', {
			title: 'My Profile',
			message: req.flash('success')
		});
	});
});

router.get('/signup', function(req, res, next){
	res.render('accounts/signup',{
		title: 'Sign Up',
		errors: req.flash('errors')
	});
});

router.post('/signup', function(req, res, next){
	var user = new User();
	console.log(req);
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
			req.flash('errors', 'Account with that username already exists. Please try with another username');
			return res.redirect('/signup');
		} else{
			user.save(function(err, user){
				if(err){
					return next(err);
				}

				req.logIn(user, function(err){
				if(err) return next(err);
				res.redirect('/profile');
				})
				// res.json({message: 'Created Successfully'});

			});
		}
	});
});

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('home');
});

router.post('/profile', function(req, res, next){
	User.findOne({ _id: req.user._id }, function(err, user){

		if(err){
			return next(err);
		}
		console.log(req.body);
		console.log(user);
		if(req.body.firstname != '' || req.body.firstname != null)
			user.profile.name.firstname = req.body.firstname;
		if(req.body.lastname != '')
			user.profile.name.firstname = req.body.firstname;
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

module.exports = router;