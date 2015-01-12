var passport = require('passport');

/*
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
*/

exports.authenticate = function(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false})}
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({success:true, user: user});
    })
  })
  auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}