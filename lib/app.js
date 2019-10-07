const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const zips = require('./routes/zips');
const students = require('./routes/students');
const trades = require('./routes/trades');
const grades = require('./routes/grades');
const books = require('./routes/books');
app.use('/api/zips', zips);
app.use('/api/students', students);
app.use('/api/trades', trades);
app.use('/api/grades', grades);
app.use('/api/books', books);


// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;