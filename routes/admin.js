var router = require('express').Router();
var Category = require('../models/category');

// router.get('/add-category', function(req, res, next) {
// 	if(req.user != null){
// 	  	res.render('admin/add-category',{
// 	  		title: 'Add Category',
// 	   		message: req.flash('success') 
// 		});
// 	}
// 	else{
// 		req.flash('loginMessage','Your session has been ended. Please login again!!');
// 		return res.redirect('/home');
// 	}
// });

router.post('/add-category', function(req, res, next) {
	var category = new Category();
	console.log(req.body);
	if(req.body.category != '')
		category.name = req.body.newCategory;

	category.save(function(err) {
	if (err)
		return next(err);
	
	console.log('Category:'+ category.name +' is added.');
	req.flash('message', 'Successfully added a category');
	return res.redirect('/home');
	// res.json({message: 'Created Successfully'});
	});
});


module.exports = router;