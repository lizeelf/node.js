var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
  var parseUrl = url.parse(request.url);
  var resource = parseUrl.pathname;
  console.log('resource = ' + resource);

  var resourcePath = '.' + resource;

  if (resource.indexOf('/view/') == 0) {
    fs.readFile(resourcePath, 'utf-8', function(error, data) {
      if (error) {
        response.writeHead(500, { 'Content-Type' : 'text/html'} );
        response.end('500 Internal Server ' + error);
      } else {
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        response.end(data);
      }
    });
  } else if (resource.indexOf('/video/') == 0) {
    var stream = fs.createReadStream(resourcePath);
    var count = 0;
    stream.on('data', function(data) {
      count++;
      console.log('Data Count = ' + count);
      response.write(data);
    });

    stream.on('end', function() {
      console.log('End streaming...');
      response.end();
    });

    stream.on('error', function(err) {
      console.log(err);
      response.end('500 Internal Server ' + err);
    });

  } else {
    response.writeHead(404, { 'Content-Type' : 'text/html'} );
    response.end('404 Page Not Found');
  }

});

server.listen(8080, function() {
  console.log('Server is running...');
});
