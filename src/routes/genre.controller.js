// Require Express..
const express = require('express');

// Require Genre Model..
const {
    genres
} = require('../models/genre.model');

// Genre Controller Functions
// Get All Genres
function httpGetAllGenres(req, res) {
    return (res.status(200).json(genres));
}

// Get a Genre with ID
function httpGetGenre(req, res) {
    const genreId = Math.abs(req.params.id) - 1;
    const genre = genres[genreId];
    if (!genre) {
        return (res.status(404).json({
            error: "Genre Not Found!",
        }));
    }
    return (res.status(200).json(genre));
}

// Post a Genre
function httpAddGenre(req, res) {
    const newGenre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    if (!newGenre.name) {
        return (res.status(400).json({
            error: "Bad Request, Name Not Found!"
        }));
    }
    genres.push(newGenre);
    return (res.status(201).json(newGenre));
}

// Update(PUT) a Genre
function httpUpdateGenre(req, res) {
    const genreId = Math.abs(req.params.id) - 1;
    const genre = genres[genreId];
    if (!genre) {
        return (res.status(404).json({
            error: `Genre with the ID ${genreId} not found!`,
        }));
    }

    const name = req.body.name;
    if (!name) {
        return (res.status(400).json({
            error: "Bad Request, Name Not Found!",
        }));
    }

    genre.name = name;
    return (res.status(200).json(genre));
}

// Delete a Genre
function httpDeleteGenre(req, res) {
    const genreId = Math.abs(req.params.id) - 1;
    const genre = genres[genreId];
    if (!genre) {
        return (res.status(404).json({
            error: `Genre with the ID ${genreId} not found!`,
        }));
    }

    genres.splice(genreId, 1);
    return (res.status(200).json(genre));
}

// Export Controller Functions..
module.exports = {
    httpGetAllGenres,
    httpGetGenre,
    httpAddGenre,
    httpUpdateGenre,
    httpDeleteGenre,
}