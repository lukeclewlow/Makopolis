var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000 ;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index');
});

io.on('connection', function(socket) {
  console.log('Client connected');
  io.emit('newPlayer',{data: socket.id});
  socket.emit('playerID', {data: socket.id});
})

server.listen(port, function(){
  console.log("Node app is running at localhost:" + port);
})