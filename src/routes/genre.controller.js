// Require Express..
const express = require('express');

// Require Genre Model..
const {
    getGenres,
    getGenre,
    saveGenre,
    putGenre,
    delGenre,
} = require('../models/genre.model');

// Genre Controller Functions
// Get All Genres
async function httpGetAllGenres(req, res) {
        const dbGenre = await getGenres();
        return (res.status(200).json(dbGenre));
    }

// Get a Genre with ID
async function httpGetGenre(req, res) {
        const genreId = req.params.id;
        const genre = await getGenre(genreId);
        if (!genre) {
            return (res.status(404).json({
                error: "Genre Not Found!",
            }));
        }
        return (res.status(200).json(genre));
    }

// Post a Genre
async function httpAddGenre(req, res) {
        const newGenre = req.body;
        if (!newGenre.name) {
            return (res.status(400).json({
                error: "Bad Request, Name Not Found!"
            }));
        }
        const postGenre = await saveGenre(newGenre);
        return (res.status(201).json(postGenre));
    }

// Update(PUT) a Genre
async function httpUpdateGenre(req, res) {
    const genreId = req.params.id;
    const genre = await getGenre(genreId);
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

    const updatedGenre = await putGenre(req);
    return (res.status(200).json(updatedGenre));
}

// Delete a Genre
async function httpDeleteGenre(req, res) {
        const genreId = req.params.id;
        const genre = await getGenre(genreId);
        if (!genre) {
            return (res.status(404).json({
                error: `Genre with the ID ${genreId} not found!`,
            }));
        }

        const deletedGenre = await delGenre(genreId);
        return (res.status(200).json(deletedGenre));
    }

// Export Controller Functions..
module.exports = {
    httpGetAllGenres,
    httpGetGenre,
    httpAddGenre,
    httpUpdateGenre,
    httpDeleteGenre,
}