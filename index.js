var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	 res.sendFile("index.html", {"root": 'public/'});
});

var exec = require('child_process').exec;

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', {'message': msg});
		console.log('message: ' + msg);
		var child = exec(msg, function (error, stdout, stderr) {
	        if(stdout!==''){
	            console.log('stdout\n' + stdout);
	            io.emit('chat message', {'message': stdout});
	        }
	        if(stderr!==''){
	            console.log('stderr:\n' + stderr);
	            io.emit('chat message', {'message': stderr});
	        }
	        if (error !== null) {
	            console.log('exec error:\n[' + error+']');
	            io.emit('chat message', {'message': error});
	    	}
    	});
	});
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});