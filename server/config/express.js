var express = require('express'),
	stylus  = require('stylus'),
	logger  = require('morgan'),
	bodyParser = require('body-parser');
	cookieParser = require('cookie-parser'),
	passport  	= require('passport'),
	session = require('express-session');

module.exports = function(config){

	var app = express();
	var __dirname = config.__dirname;
	// compile stylus
	function compile (str,path){
		return stylus(str).set('filename',path);
	}
	console.log('__dirname',__dirname,config.__dirname);
	// set server side views
	app.set('views',__dirname + '/server/views');
	app.set('view engine','jade');
	app.use(stylus.middleware(
		{
			src:__dirname+'/public',
			compile:compile
		}
	));
	app.use(logger('dev'));
	// must use cookieParser before expressSession
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(session({secret:'somesecrettokenhere'}));


	// app.use(express.cookieSession());
	// app.use(cookieParser());
	// app.use(session({secret:'robotcode'}));
	// initialize passport
	app.use(passport.initialize());
	app.use(passport.session());


	// adding middleware

	
	// app.use(bodyParser());

	// serve static files
	app.use(express.static(__dirname+'/public'));

	/*app.use(function(req, res, next){
		console.log('waaaaa');
		console.log('user is: ',req.user);
		next();
	})*/
	console.log('this should be first')
	return app;
}