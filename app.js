var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});



var clients = 0;

io.on('connect', function(socket){
    clients++;
    io.sockets.emit('broadcast', { description: clients +'Clients connected!'});

    // Whenever someone disconnects this piece of code executed
 socket.on('disconnect', function(){
    clients--;
    io.sockets.emit('broadcast', { description: clients + 'Clients connected!'});
 });
});

// Whenever someone connects this gets executed
//io.on('connect', function(socket){
//    console.log('A user connected');

    // Send a message after a timeout of 4 seconds
//  setTimeout(function(){
//        socket.emit('premierEvent', { description: 'A custom event named premierEvent!'});
//    }, 4000);

    // Whenever someone disconnects this piece of code executed
// socket.on('clientEvent', function(data){
//     console.log(data);
// });
//});

http.listen(3000, function(){
console.log('listening on *:3000');
});