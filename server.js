var http = require('http');
var fs = require('fs');

var host = '0.0.0.0';
var port = '7000';



var myServer = http.createServer(function (req, res) {

    console.log('requested ' + req.method + ' ' + req.url);

    if (req.url.indexOf('/submit') !== -1) {
        console.log('\033[41m', 'Submited!', '\033[0m');
        console.log('\033[43m', 'Headers', '\033[0m', req.headers);
        console.log('\033[44m', 'Body', '\033[0m');

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            res.end('ok');
        });

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(req.method + ' to ' + req.url);
    } else if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('./static/index.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (req.url === '/phones.json') {
        setTimeout(function () {
            fs.readFile('./static/phones.json', (err, data) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(data);
            });
        }, 5000);
    } else if (req.url === '/app.js') {
        fs.readFile('./static/app.js', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(req.url + ' not found!');
    }


});




myServer.listen(port, host);
console.log('Server running at ' + host + ':' + port);
