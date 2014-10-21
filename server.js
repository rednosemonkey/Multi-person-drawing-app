var express  = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8001;

// app.set('views', __dirname + '/views'); // views is default
// app.set('view engine', 'ejs'); // if use ejs extension
app.engine('.html', require('ejs').__express); // allows use of .html
app.set('view engine', 'html'); // if use .html
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('draw');
});

io.sockets.on('connection', function(socket) {
  socket.on('banana', function(data) {
    socket.broadcast.emit('apple', data);
	});
	// socket.emit('message', { message: 'Something to say?' });
	 socket.on('send', function(msg){
    socket.broadcast.emit('message', msg);
  });
});

server.listen(port, function(){
  console.log("Listening on port " + port);
});
