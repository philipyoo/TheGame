var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(4000);

app.use(express.static(__dirname + '/dist'));
console.log("Server running on port 4000");
console.log(__dirname+'/dist');

io.sockets.on("connection", function(socket){
})
