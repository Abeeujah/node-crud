// Require Express and Morgan..
const express = require('express');
const morgan = require('morgan');

// Require Router..
const genreRouter = require('./routes/genre/genre.route');
const customerRouter = require('./routes/customer/customer.route');
const movieRouter = require('./routes/movie/movie.route');
const rentalRouter = require('./routes/rental/rental.route');
const {
    userRouter,
    authRouter,
    signRouter,
    byeRouter,
} = require('./routes/user/user.route');

// Require MiddleWare..
const {
    verifyAuth,
    verifyUser,
} = require('./middleware/auth.middleware');

// Init App..
const app = express();

// Use Middleware..
app.use(express.json());
app.use(morgan('combined'));
app.get('*', verifyUser);
app.use('/genres/', genreRouter);
app.use('/customers', verifyAuth, customerRouter);
app.use('/movies', movieRouter);
app.use('/rentals', rentalRouter);
app.use('/signup', signRouter);
app.use('/login', authRouter);
app.use('/logout', byeRouter);
app.use('/users', userRouter);

// Export App..
module.exports = app;