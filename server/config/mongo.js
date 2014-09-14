// connect to db
// Retrieve
var MongoClient = require('mongodb').MongoClient
	crypto = require('crypto');
var mongoObj = {
	MongoClient:MongoClient,db:undefined,collection:undefined,
	addEmail:function(email){
		console.log('mongojs ', email);
		var Email = this.db.collection('Email');
		Email.insert({email:email},{ w: 0 });
	},
	retrieveEmails:function(callback){
		var Email = this.db.collection('Email');
		Email.findOne(function(err,emails){
			// console.log(err,emails.toArray());
			callback(emails);
		});
		// return [{email:'rod'},{email:'Tania'}];
	}
};


module.exports = function(config){
	//db.on('error',con)
	var mongoMsg;
	// Connect to the db
	// var connectionStringMongo = env==='development'?"mongodb://localhost:27017/cloudFarm":'mongodb://rodrigosavage:rtopdfrtio@ds063869.mongolab.com:63869/cloudfarm';
	MongoClient.connect(config.db, function(err, db) {
	  if(!err) {
	    console.log("We are connected");
	    /*
	    var collection = db.collection('msg');
	    collection.findOne(function(err,messDoc){
			console.log('err',err,'msg',messDoc);
			mongoMsg = messDoc.msg;
		});
		*/
		mongoObj.db = db;
		mongoObj.collection = db.collection;
		successfullConnect(mongoObj);

	  }
	});
	return mongoObj;
}

function successfullConnect(mongoObj){
	var db = mongoObj.db;
	var User = db.collection('User');
	addMethodsUser(User);
	mongoObj.User = User;
	console.log('conecction exitossa');
	User.findOne({},function(err,users){
		// console.log('err',err,'users,',users);
		if(users === null){

			var salt=createSalt();
			// insert test users :)
			User.insert({firstName:'Joe',lastName:'Doe',userName:'miau',salt:salt,hashed_pwd:hashPwd(salt,'miau')},{ w: 0 });
			User.insert({firstName:'Rodrigo',lastName:'Savage',userName:'rod',salt:salt,hashed_pwd:hashPwd(salt,'miau')},{w:0});
			console.log('inserto dos us');
		}
		/*
			userSchema
			{firstName:'Joe',lastName:'Doe',userName:'miau',salt,hashed_pwd}

		*/
	});

}
function addMethodsUser(User){
	User.m = {
		authenticate:function(user,passToMatch){
			// console.log('authe ',user,' pass '+passToMatch);
			//var hashPwd = 
			return hashPwd(user.salt,passToMatch) === user.hashed_pwd;
		}
	};
}
function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
	var hmac = crypto.createHmac('sha1',salt);
	return hmac.update(pwd).digest('hex'); // return the pass in hex format
}