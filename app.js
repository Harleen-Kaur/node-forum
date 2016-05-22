
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , engine = require('ejs-mate')
  , mongoose = require('mongoose')
  , errorHandler = require('errorhandler')
  // , favicon = require('serve-favicon')
  , morgan = require('morgan')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  , flash = require('express-flash')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , passport = require('passport')
  , MongoStore = require('connect-mongo/es5')(session)
  , User = require('./models/user')
  , secret = require('./config/secret')
  , userRoutes = require('./routes/user')
  , mainRoutes = require('./routes/main');


var app = express();

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || secret.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));   
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon());
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({ url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});


mongoose.connect(secret.database, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

 app.get('/', routes.index);
app.use(userRoutes);
app.use(mainRoutes);

app.listen(secret.port, function(err){
  if(err) throw err;
  console.log("Server is listening on port "+ secret.port);
});