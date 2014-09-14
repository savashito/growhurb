var auth = require('./auth');

module.exports = function(app)
{
	// handle partials with jade
	app.get('/partials/*',function(req,res){
		var partial = '../../public/app/' + req.params[0];
		console.log('renderenando part ',partial);
		res.render(partial);
	});

	// all request are handle by this
	app.get('*',function (req,res){
		console.log('renderiando index ',req.user);
		res.render('index');
	});

	app.post('/login',auth.authenticate);
	app.post('/logout',function (req,res){
		console.log('userLog Out');
		req.logout();
		res.end();
	});
}