// Require Model, JWT..
const jwt = require('jsonwebtoken');
const {
    getAllUsers,
    getUser,
    postUser,
    updateUser,
    postLogin
} = require('../../models/user/user.model');

// JWT Signature..
const maxAge = 1 * 24 * 60 * 60;
function webToken(id) {
    return (jwt.sign({ id }, 'vidlyyldiv', {
        expiresIn: maxAge,
    }));
}

// HTTP Functions..
async function httpGetAllUsers(req, res) {
    const users =  await(getAllUsers());
    return (res.status(200).json(users));
}

async function httpGetUser(req, res) {
    const userId = req.params.id;
    const user = await getUser(userId);
    return (res.status(200).json(user));
}

async function httpSignUp(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data",
        }));
    }
    const user = await postUser(req);
    if(!user._id) {
        return (res.status(400).json(user));
    }
    const token = webToken(user._id);
    res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
    });
    return (res.status(201).json({ user: user.email }));
}

async function httpUpdateUser(req, res) {
    const userId = req.params.id;
    const oldUser = await(getUser(userId));
    if(!oldUser) {
        return (res.status(404).json({
            error: "Bad Request, User Does not Exist"
        }));
    }
    const updatedUser = await (updateUser(req));
    return(res.status(200).json({ user: updatedUser.email }));
}

async function httpLogin(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data",
        }));
    }
    const user = await postLogin(req);
    if(!user._id) {
        return (res.status(400).json(user));
    }
    const token = webToken(user._id);
    res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
    });
    return (res.status(201).json({ user: user._id }));
}

function httpLogout(req, res) {
    res.cookie(jwt, '', {
        maxAge: 1,
    });
    res.redirect('/login');
}

// Export HTTP Function..
module.exports = {
    httpGetAllUsers,
    httpGetUser,
    httpSignUp,
    httpUpdateUser,
    httpLogin,
    httpLogout,
};