// Require Models..
const {
    getMovies,
    getMovie,
    addMovie,
    updateMovie,
    delMovie,
} = require('../../models/movie/movie.model');

// Define HTTP Functions..
// GET All Movies..
async function httpGetAllMovies(req, res) {
    const dbMovies = await getMovies();
    return (res.status(200).json(dbMovies));
}

// GET a Movie..
async function httpGetMovie(req, res) {
    const id = req.params.id;
    const dbMovie = await getMovie(id);
    return (res.status(200).json(dbMovie));
}

// POST a Movie..
async function httpAddMovie(req, res) {
    const movie = req.body;
    const movieTitle = movie.title;
    const movieGenre = movie.genre;
    if(!movieTitle || !movieGenre) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data",
        }));
    }
    const genMovie = await addMovie(movie);
    return (res.status(201).json(genMovie));
}

// Update (PUT) a Movie..
async function httpUpdateMovie(req, res) {
    const movieId = req.params.id;
    const movie = await getMovie(movieId);
    if (!movie) {
        return(res.status(404).json({
            error: "Movie Requested Not Found",
        }));
    }
    const update = req.body;
    if(!update.title || !update.genre) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data",
        }));
    }
    const updatedMovie = await updateMovie(req);
    return (res.status(200).json(updatedMovie));
}

// Delete a Movie..
async function httpDeleteMovie(req, res) {
    const movieId = req.params.id;
    const movie = await getMovie(movieId);
    if(!movie) {
        return (res.status(404).json({
            error: "Movie Requested Not Found",
        }));
    }
    const deletedMovie = await delMovie(movieId);
    return (res.status(200).json(deletedMovie));
}

// Export HTTP Functions..
module.exports = {
    httpGetAllMovies,
    httpGetMovie,
    httpAddMovie,
    httpUpdateMovie,
    httpDeleteMovie
};