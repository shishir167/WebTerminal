var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	 res.sendFile("index.html", {"root": 'public/'});
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', {'message': msg});
		console.log('message: ' + msg);
	});
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});