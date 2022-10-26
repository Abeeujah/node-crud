// Require Express and API Controllers..
const express = require('express');
const {
    httpGetAllMovies,
    httpGetMovie,
    httpAddMovie,
    httpUpdateMovie,
    httpDeleteMovie,
} = require('./movie.controller');

// Create Router..
const movieRouter = express.Router();

// Route Endpoints..
movieRouter.get('/', httpGetAllMovies);
movieRouter.get('/:id', httpGetMovie);
movieRouter.post('/', httpAddMovie);
movieRouter.put('/:id', httpUpdateMovie);
movieRouter.delete('/:id', httpDeleteMovie);

// Export Router..
module.exports = movieRouter;