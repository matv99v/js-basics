const http = require('http');
const express = require('express');
const morgan = require('morgan');
const formData = require("express-form-data");
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 7000;

const app = express();
app.use(morgan('dev')); // using morgan logger in 'dev' mode
app.use(express.static(__dirname + '/public')); // serving static pages from folder
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(formData.parse({
    autoFiles: true
}));



app.all('/submit/urlencoded', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/submit/urlencoded', (req, res, next) => {
    // no body for GET request
    console.log('no body!');
    res.end('Success get urlencoded with no response body');
});

app.post('/submit/urlencoded', (req, res, next) => {
    console.log(req.body);
    res.end('Success post urlencoded: ' + '\r\n' + JSON.stringify(req.body));
});

app.post('/submit/multipart', (req, res, next) => {
    console.log(req.body);
    res.end('Success post multipart: ' + '\r\n' + JSON.stringify(req.body));

});

app.post('/submit/textplain', (req, res, next) => {
    console.log(req.body);
    res.end('Success post textplain: ' + '\r\n' + req.body);
});

app.post('/submit/json', (req, res, next) => {
    console.log(req.body);
    // even though HTML form has "application/json" encryption type, it uses default "urlencoded"
    res.end('Success post JSON: ' + '\r\n' + JSON.stringify(req.body));
});

app.post('/submit/files', (req, res, next) => {
    console.log(req.files);
    const result = req.files.myUploadedFiles.map(el => {
        return {
            name: el.name,
            type: el.type,
            size: el.size
        }
    });
    res.end('Success post a file: ' + '\r\n' + JSON.stringify(result));
});




const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});
