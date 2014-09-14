var passport = require('passport');

module.exports.authenticate = function(req,res,next){
	var auth = passport.authenticate ('local',function(err,user){
		if(err){
			console.log('error ',err);
			return next(err);}
		if(!user){res.send({success:false})}
		// tel passport to login
		req.logIn(user,function(err){
			if(err){
				console.log('error ',err);
				return next(err);
			}
			req.user = user;
			console.log('exito User Now',user);
			res.send({success:true,user:user});
		});
	});
	auth(req,res,next);
	// res.send({success:true,user:'e'});
};