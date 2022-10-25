// Require Express and Morgan..
const express = require('express');
const morgan = require('morgan');

// Require Router..
const genreRouter = require('./routes/genre.route');

// Init App..
const app = express();

// Use Middleware..
app.use(express.json());
app.use(morgan('combined'));
app.use('/genres/', genreRouter);

// Export App..
module.exports = app;