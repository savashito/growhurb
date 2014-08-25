var express = require('express'),
	stylus  = require('stylus'),
	logger  = require('morgan'),
	// mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	// Retrieve
var MongoClient = require('mongodb').MongoClient;

// USE NODE enviroment variable to determine if we are in production or development mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// compile stylus
function compile (str,path){
	return stylus(str).set('filename',path);
}

// set server side views
app.set('views',__dirname + '/server/views');
app.set('view engine','jade');
app.use(stylus.middleware(
	{
		src:__dirname+'/public',
		compile:compile
	}
));
// connect to db
// Retrieve
var MongoClient = require('mongodb').MongoClient;
/*
mongoose.connect('mongodb://localhost/cloudFarm')
var db = mongoose.connection;

db.on('error',function(error){
	console.log('error en db ',error);
})
db.once('open',function(){
	console.log('conection con la db cloudFarm');
})
*/
//db.on('error',con)
var mongoMsg;
// Connect to the db
var connectionStringMongo = env==='development'?"mongodb://localhost:27017/cloudFarm":'mongodb://rodrigosavage:rtopdfrtio@ds063869.mongolab.com:63869/cloudfarm';
MongoClient.connect(connectionStringMongo, function(err, db) {
  if(!err) {
    console.log("We are connected");
    var collection = db.collection('msg');
    collection.findOne(function(err,messDoc){
		console.log('err',err,'msg',messDoc);
		mongoMsg = messDoc.msg;
	});
  }
});

/*
var msgSchema = mongoose.Schema({
	msg: String
});

var Msg = mongoose.model('msg',msgSchema);
*/



/*
Msg.findOne().exec(function(err,messDoc){
	console.log('err',err,'msg',messDoc);
	// mongoMsg = messDoc.msg;
})
*/



app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(bodyParser());

// serve static files
app.use(express.static(__dirname+'/public'));


// handle partials with jade
app.get('/partials/:partialPath',function(req,res){
	var partial = 'partials/' + req.params.partialPath;
	console.log('renderenando part ',partial);
	res.render(partial);
});

// all request are handle by this
app.get('*',function (req,res){
	console.log('renderiando index');
	res.render('index',{mongoMsg:mongoMsg});
}); // serve only index for all routes
// possible make it run on Horoku
var port =  process.env.PORT || 3030;
app.listen(port);
console.log('Escuhcando en puerto ',port);