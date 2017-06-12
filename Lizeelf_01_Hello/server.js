var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('Hello World...');
}).listen(8000, function() {
    console.log('Server running at http://localhost:8000/');
});
