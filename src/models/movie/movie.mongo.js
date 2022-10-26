// Require Mongoose and GenreSchema..
const mongoose = require('mongoose');
const {
    genreSchema,
} = require('../genre/genre.mongo');

// Define Movie Schema..
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
    }
});

// Init Movie Model..
const movieModel = mongoose.model('Movie', movieSchema);

// Export Schema and Model..
module.exports = {
    movieSchema,
    movieModel
};