// Require Mongoose..
const mongoose = require('mongoose');

// Create GenreSchema..
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

// Init Genre Model
const genreModel = mongoose.model('Genre', genreSchema);

// Export Schema and Model..
module.exports = {
    genreSchema,
    genreModel,
};