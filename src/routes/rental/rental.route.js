// Require Express and Controller..
const express = require('express');
const {
    httpGetAllRentals,
    httpGetRental,
    httpSaveRentals,
    httpUpdateRental,
    httpDelRental,
} = require('./rental.controller');

// Create Rentals Router..
const rentalRouter = express.Router();

// Route Endpoints..
rentalRouter.get('/', httpGetAllRentals);
rentalRouter.get('/:id', httpGetRental);
rentalRouter.post('/', httpSaveRentals);
rentalRouter.put('/:id', httpUpdateRental);
rentalRouter.delete('/:id', httpDelRental);

// Export Router..
module.exports = rentalRouter;