const express = require('express');
const app = express();

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Middleware for logging
const { createWriteStream } = require('fs');
const morgan = require('morgan');

app.use(express.static('public'));
app.use(morgan('tiny', { stream: createWriteStream('./app.log', { flags: 'a' }) }))

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Middleware for error handling
const errorhandler = require('errorhandler')
app.use(errorhandler())

module.exports = app;