const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');

const app = express();

// DB Setup
// mongoose.connect('mongodb://localhost:27017/auth');
mongoose.connect('mongodb://heroku_gg35vrsj:g2rv6mbs6g3k2ml3qni20r8fbe@ds147518.mlab.com:47518/heroku_gg35vrsj');

// App Setup
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port: ' + port);
