// Require Express and Morgan..
const express = require('express');
const morgan = require('morgan');

// Require Router..
const genreRouter = require('./routes/genre/genre.route');
const customerRouter = require('./routes/customer/customer.route');
const movieRouter = require('./routes/movie/movie.route');
const rentalRouter = require('./routes/rental/rental.route');

// Init App..
const app = express();

// Use Middleware..
app.use(express.json());
app.use(morgan('combined'));
app.use('/genres/', genreRouter);
app.use('/customers', customerRouter);
app.use('/movies', movieRouter);
app.use('/rentals', rentalRouter);

// Export App..
module.exports = app;