
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Forums' });
};

// module.exports= router;