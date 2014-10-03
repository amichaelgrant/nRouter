var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});

var net = require('net');
var server = net.createServer(function(socket) {
socket.write('Echo server\r\n');
socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');