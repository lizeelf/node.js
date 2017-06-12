var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//js file
app.use('/js', express.static(__dirname + '/js'));

//route
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/chart.html');
});

//socke.io
io.on('connection', function(socket) {
  console.log('connected.');
  var repeat = null;
  socket.on('send', function(msg) {
    if (repeat !== null) {
      clearInterval(repeat);
    }
    var delay = 2 * 1000;
    repeat = setInterval(function() {
      var data = [];
      data.push(makeRandom(155, 185));
      data.push(makeRandom(40, 60));
      io.emit('server', data);
    }, delay);
  });
  socket.on('disconnect', function() {
    console.log('disconnectd.');
    clearInterval(repeat);
  });
});

//server listen
http.listen(3000, function() {
  console.log('listen on 3000');
});

//function
function makeRandom(min, max){
    var RandVal = Math.random() * (max- min) + min;
    return Math.floor(RandVal);
}
