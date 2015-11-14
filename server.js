var express = require('express');
var app = express();

var io = require('socket.io').listen(app);

app.get('/main',function(req,res){
res.sendFile(__dirname + '/main.html');
});

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

io.sockets.on('connection', function(socket){
  
});
