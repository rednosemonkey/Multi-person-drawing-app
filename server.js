var express  = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8001;

app.engine('.html', require('ejs').__express); 
app.set('view engine', 'html'); 
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('draw');
});

io.sockets.on('connection', function(socket) {
  socket.on('banana', function(data) {
    socket.broadcast.emit('apple', data);
	});
});

server.listen(port, function(){
  console.log("Listening on port " + port);
});
