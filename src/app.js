// Require Express..
const express = require('express');

// Require Router..
const genreRouter = require('./routes/genre.route');

// Init App..
const app = express();

// Use Middleware..
app.use(express.json());
// app.use('/', (req, res) => {
//     console.log(req.ip);
//     return (res.status(200).json({
//         message: "Welcome To Genres",
//     }));
// });
app.use('/genres/', genreRouter);

// Export App..
module.exports = app;