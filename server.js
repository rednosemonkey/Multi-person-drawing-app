var io;
io = require('socket.io').listen(3000);
io.sockets.on('connection', function(socket) {
  socket.on('banana', function(data) {
	    socket.broadcast.emit('apple', data);
  });
});
