// Require Express Module..
const express = require('express');

// Require Controller Functions..
const {
    httpGetAllGenres,
    httpGetGenre,
    httpAddGenre,
    httpUpdateGenre,
    httpDeleteGenre,
} = require('./genre.controller');

// Creare Router..
const genreRouter = express.Router();

// Register Routes..
genreRouter.get('/', httpGetAllGenres);
genreRouter.get('/:id', httpGetGenre);
genreRouter.post('/', httpAddGenre);
genreRouter.put('/:id', httpUpdateGenre);
genreRouter.delete('/:id', httpDeleteGenre);

// Export Router..
module.exports = genreRouter;