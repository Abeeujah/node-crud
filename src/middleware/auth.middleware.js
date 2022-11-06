// Require JWT, User model..
const jwt = require('jsonwebtoken');
const {
    userModel,
} = require('../models/user/user.mongo');

// Verify and Authorize User..
async function verifyAuth(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'vidlyyldiv', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// Get Current Authenticated User..
async function verifyUser(req, res, next) {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'vidlyyldiv', async (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                res.locals.user = await userModel.findById(decodedToken.id);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

// Export MiddleWare..
module.exports = {
    verifyAuth,
    verifyUser,
};