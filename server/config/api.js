var net = require('net');
var server = net.createServer()
module.exports = function(app,config)
{
	var port = 5555;// config.port;
	// Listen for hurbs trying to connect
	var server = net.createServer(function(c) { //'connection' listener
	  console.log('Hurb a contactado servidor');
	  c.on('end', function() {
	    console.log('Hurb has disconnected');
	  });
	  c.write('Wilkomme Hurb\r\n');
	  // c.pipe(c);
	  c.on('data',function(d){
	  	console.log(d.toString());
	  	c.write('Server says: '+d.toString());
	  });

	});
	server.listen(port, function() { //'listening' listener
  		console.log('server bound');
	});
	console.log('listening for sockets connectios',port);

}