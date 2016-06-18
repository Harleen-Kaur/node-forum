var router = require('express').Router();
var Forum = require('../models/forum');
var User = require('../models/user');
var Category = require('../models/category');

router.get('/home',function(req,res){
	res.render('main/home',{
    title: 'Home',
    message: req.flash('loginMessage'),
    successMessage: ''
  });
});

router.get('/forums', function(req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
	res.render('main/forums',{
		title: 'Forums',
		message: ''
  });
});

router.get('/forum-topics', function(req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
	res.render('main/forum-topics',{
		title: 'Forum - topics',
		message: ''
  });
});

router.get('/topic-posts', function(req, res) {
 	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
 	res.render('main/topic-posts', {
  		title: 'Topic - Posts',
  		message: ''
  });
});

router.get('/forum-moderators', function(req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
	res.render('main/forum-moderators',{
    	title: 'Forum - moderators',
    	message: ''
      });
});

router.post('/add-forum', function(req, res, next) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');

	User.findOne({ _id: req.user._id }, function(err, user){

		if(err){
			return next(err);
		}
		console.log(req.body);
		console.log(user);

		var forum = new Forum();
		if(req.body.newForumTitle != '')
			forum.title = req.body.newForumTitle;
		if(req.body.newForumStatus != '')
			forum.active = req.body.newForumStatus;

		forum.category = req.body.newForumCategory;
		forum.author = user._id;
		forum.created_date = new Date;
		forum.updated_date = new Date;
		
		// Category.findOne({ _id: req.body.newForumCategory._id }, function(err, category){

		// 	if(err){
		// 		return next(err);
		// 	}

		// 	forum.category = ;

		// });

		forum.save(function(err) {
		if (err){
			console.log('Error occurred while saving forum');
			req.flash('message','Error occurred while saving forum');
			return res.redirect('/error');
			// return next(err);
		}
		
		console.log('Forum:\"'+ forum.title +'\" is added.');
		req.flash('success', 'Successfully added your forum');
		return res.redirect('/forums');
		// res.json({message: 'Created Successfully'});
		});
	});

	
});

router.post('/edit-forum', function(req, res, next) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');

	User.findOne({ _id: req.forum._id }, function(err, user){

		if(err){
			return next(err);
		}
		console.log(req.body);
		console.log(user);

		var forum = new Forum();
		if(req.body.editForumTitle != '')
			forum.title = req.body.editForumTitle;
		if(req.body.editForumStatus != '')
			forum.active = req.body.editForumStatus;

		forum.category = req.body.editForumCategory;
		// forum.author = user._id;
		// forum.created_date = new Date;
		forum.updated_date = new Date;
		
		// Category.findOne({ _id: req.body.newForumCategory._id }, function(err, category){

		// 	if(err){
		// 		return next(err);
		// 	}

		// 	forum.category = ;

		// });

		forum.save(function(err) {
		if (err){
			console.log('Error occurred while saving forum');
			req.flash('message','Error occurred while saving forum');
			return res.redirect('/error');
			// return next(err);
		}
		
		console.log('Forum:\"'+ forum.title +'\" is updated.');
		// req.flash('success', 'Successfully added your forum');
		// return res.redirect('/forums');
		res.json({message: 'Updated Successfully'});
		});
	});
});

module.exports = router;