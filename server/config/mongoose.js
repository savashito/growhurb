var mongoose = require('mongoose'),
	crypto = require('crypto');
module.exports = function(config){
	// connect to the database
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console,'conn error :('));
	db.once('open',	function callback() {
		console.log('Server conncected to db');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		user : String
	});

	// crea el schema
	var User = mongoose.model('User',userSchema);
	// check if any documents are present 
	User.find({}).exec(function(err, collection){

		console.log('err',err,'users,',collection);
		if(collection.length ===0){
			var salt = createSalt();
			User.create({firstName:'Joe',lastName:'Doe',user:'miau',salt:salt,hashed_pwd:hashPwd(salt,'miau')});
			User.create({firstName:'Rodrigo',lastName:'Savage',user:'rod',salt:salt,hashed_pwd:hashPwd(salt,'miau')});
		
		}
	})
};
function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
	var hmac = crypto.createHmac('sha1',salt);
	return hmac.update(pwd).digest('hex'); // return the pass in hex format
}