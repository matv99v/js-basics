const http = require('http');
const express = require('express');
const morgan = require('morgan');
const formData = require("express-form-data");
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 8000;

const app = express();
app.use(morgan('dev')); // using morgan logger in 'dev' mode
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(formData.parse({
    autoFiles: true
}));


app.all('/submit', (req,res,next) => {
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/submit/cors', (req, res, next) => {
    // allowing CORS, try to comment out next line
    res.setHeader('Access-Control-Allow-Origin', '*');

    const reqOrigin = req.get('Origin');
    const resOrigin = res.get('Access-Control-Allow-Origin');

    if (reqOrigin === 'http://localhost:7000' && resOrigin === '*') {
        res.statusCode = 200;
        res.end('CORS reached!');
    } else {
        res.statusCode = 403;
        res.end('Forbidden due to CORS');
    }
});




const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});
