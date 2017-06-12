var fs = require('fs');
var http = require('http');
var express = require('express');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/location');

var location = mongoose.Schema({
  name: 'string',
  latitude: 'number',
  longitude: 'number',
  date: 'date'
});

var Location = mongoose.model('locations', location);

var app = express();
var server = http.createServer(app);

app.get('/tracker', function(request, response) {
  fs.readFile('Tracker.html', function(error, data) {
    response.send(data.toString());
  });
});

app.get('/observer', function(request, response) {
  fs.readFile('Observer.html', function(error, data) {
    response.send(data.toString());
  });
});

app.get('/showdata', function(request, response) {
  Location.find(function(error, locations) {
    response.send(locations);
  });
});

server.listen(52273, function() {
  console.log('Server Running at http://localhost:52273');
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  socket.on('join', function(data) {
    socket.join(data);
  });

  socket.on('location', function(data) {
    var newLocation = new Location({ name: data.name, latitude: data.latitude, longitude: data.longitude, date: Date.now() });

    newLocation.save(function(error, data) {
      //console.log(data);
      if (error) {
        console.log(error);
      }
    });

    io.sockets.in(data.name).emit('receive', {
      latitude: data.latitude,
      longitude: data.longitude,
      date: Date.now()
    });
  });
});
