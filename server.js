const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./app/router');
const cors = require('cors');

const app = express();

// DB Setup
mongoose.connect('mongodb://heroku_gg35vrsj:g2rv6mbs6g3k2ml3qni20r8fbe@ds147518.mlab.com:47518/heroku_gg35vrsj');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port: ' + port);
