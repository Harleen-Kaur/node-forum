var router = require('express').Router();


router.get('/about', function(req, res) {
	res.render('extra/about');
});

router.get('/faq', function(req, res) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
	res.render('main/faq',{
  	title: 'Frequently Asked Questions',
  	message: ''
  });
});

router.get('/error', function(req, res) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
  res.render('extra/404');
});

router.get('/settings', function(req, res) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
  if(req.user != null){
    res.render('extra/settings',{
      title: 'Settings',
    	message: ''
    });
  }
  else{
    req.flash('loginMessage','Your session has been ended. Please login again!!');
    return res.redirect('/home');
  }
});


module.exports = router;