// Require Express, Controllers..
const express = require('express');
const {
    httpGetAllUsers,
    httpGetUser,
    httpSignUp,
    httpUpdateUser,
    httpLogin,
    httpLogout,
} = require('./user.controller');

// Create Router..
const userRouter = express.Router();
const authRouter = express.Router();
const signRouter = express.Router();
const byeRouter = express.Router();

// Route Routes..
userRouter.get('/', httpGetAllUsers);
userRouter.get('/:id', httpGetUser);
userRouter.put('/:id', httpUpdateUser);
authRouter.post('/', httpLogin);
signRouter.post('/', httpSignUp);
byeRouter.post('/', httpLogout);

// Export Routers..
module.exports = {
    userRouter,
    authRouter,
    signRouter,
    byeRouter,
};