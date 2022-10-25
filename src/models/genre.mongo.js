// Require Mongoose..
const mongoose = require('mongoose');

// Create GenreSchema..
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

// Export Schema..
module.exports = mongoose.model('Genre', genreSchema);