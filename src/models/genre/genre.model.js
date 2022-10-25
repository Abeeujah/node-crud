// Require Genre Model..
const genreModel = require('./genre.mongo');

// Database CRUD..
async function getGenres() {
    return await genreModel.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function getGenre(name) {
    return await genreModel.findOne({
        name,
    }, {
        '_id': 0,
        '__v': 0,
    });
}

async function saveGenre(genre) {
    return await genreModel.findOneAndUpdate({
        name: genre.name,
    }, genre, {
        new: true,
        upsert: true,
    });
}

async function putGenre(req) {
    return await genreModel.findOneAndUpdate({
        name: req.params.id,
    }, req.body, {
        new: true,
    });
}

async function delGenre(name) {
    return await genreModel.findOneAndDelete({
        name,
    });
}

// Export CRUD Functions..
module.exports = {
    getGenres,
    getGenre,
    saveGenre,
    putGenre,
    delGenre,
};