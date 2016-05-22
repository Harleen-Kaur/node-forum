var router = require('express').Router();

router.get('/faq', function(req, res) {
  res.render('main/faq');
});

module.exports = router;