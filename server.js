
// Retrieve

// USE NODE enviroment variable to determine if we are in production or development mode
var env 		= process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config 		= require('./server/config/config')[env];
var app 		= require('./server/config/express')(config); // express();



var mongoObj = require('./server/config/mongo')(config);

var	passport  	= require('passport'),
	localSt		= require('passport-local').Strategy; // how passport performs auth

console.log('this should be second')

passport.use(new localSt(function(name,psw,done){
	var User = mongoObj.User;// collection('User');
	// authenticate the user if it exists
	User.findOne({userName:name},function(err,user){
		if(user && User.m.authenticate(user,psw)){
			return done(null,user);
		}else{
			return done(null,false);
		}

	})
}));


passport.serializeUser(function(user,done){
	console.log('serializing user',user);
	if(user){
		done(null,user._id);
	}
});

passport.deserializeUser(function(id,done){
	var User = mongoObj.User;
	console.log('deserializeUser user',id);
	User.findOne({_id:id},function(err,user){
		if(user){
			return done(null,user);
		}else{
			return done (null ,false);
		}
	});
});


var routes 		= require('./server/config/routes')(app);

// serve only index for all routes
// possible make it run on Horoku
var port =  config.port;// process.env.PORT || 3030;
app.listen(port);

	// adding middleware
	app.use(function(req, res, next){
		console.log('waaaaa');
		console.log('user is: ',req.user);
		next();
	});
console.log('Escuhcando en puerto ',port);