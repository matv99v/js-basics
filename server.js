var http = require('http');
var fs = require('fs');

var host = '0.0.0.0';
var port = '7000';



var myServer = http.createServer(function (req, res) {

    console.log('requested ' + req.method + ' ' + req.url);

        switch (req.url) {
            case '/':
            case '/index.html':
                fs.readFile('./static/index.html', (err, data) => {
                    if (err) throw err;
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                });
                break;

            case '/phones.json':
                setTimeout(function () {
                    fs.readFile('./static/phones.json', (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(data);
                    });
                }, 5000);
                break;

            case '/app.js':
                fs.readFile('./static/app.js', (err, data) => {
                    if (err) throw err;
                    res.writeHead(200, {'Content-Type': 'application/javascript'});
                    res.end(data);
                });
                break;

            default:
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end(req.url + ' not found!');
        }






});




myServer.listen(port, host);
console.log('Server running at ' + host + ':' + port);
