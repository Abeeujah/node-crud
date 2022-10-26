// Require Movie Model..
const {
    movieModel
} = require('./movie.mongo');

// Database CRUD..
async function getMovies() {
    return await movieModel.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function getMovie(id) {
    const truth = id.length;
    if (truth >= 22) {
        return await movieModel.findOne({
            '_id': id,
        });
    } else if (isNaN(id)) {
        return await movieModel.findOne({
            title: id,
        });
    } else {
        return await movieModel.findOne({
            $or: [
                { numberInStock: id },
                { dailyRentalRate: id },
            ]
        });
    }
}

async function addMovie(movie) {
    return await movieModel.findOneAndUpdate({
        title: movie.title,
        genre: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
    }, movie, {
        new: true,
        upsert: true,
    });
}

async function updateMovie(req) {
    const id = req.params.id;
    const movie = req.body;
    const truth = id.length;
    if (truth >= 22) {
        return await movieModel.findOneAndUpdate({
            '_id': id,
        }, movie, {
            new: true,
        });
    } else if (isNaN(id)) {
        return await movieModel.findOneAndUpdate({
            title: id,
        }, movie, {
            new: true,
        });
    } else {
        return await movieModel.findOneAndUpdate({
            $or: [
                { numberInStock: id },
                { dailyRentalRate: id },
            ]
        }, movie, {
            new: true,
        });
    }
}

async function delMovie(id) {
    const truth = id.length;
    if (truth >= 22) {
        return await movieModel.findOneAndDelete({
            '_id': id,
        });
    } else if (isNaN(id)) {
        return await movieModel.findOneAndDelete({
            title: id,
        });
    }
    else {
        return await movieModel.findOneAndDelete({
            $or: [
                { title: id },
                { genre: id.name },
                { numberInStock: id },
                { dailyRentalRate: id },
            ]
        });
    }
}

// Export CRUD Functions..
module.exports = {
    getMovies,
    getMovie,
    addMovie,
    updateMovie,
    delMovie,
};