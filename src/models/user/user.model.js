// Require User Model, Bcrypt..
const bcrypt = require('bcrypt');
const {
    userModel,
} = require('./user.mongo');

// Error Handler..
function errorHandler(err) {
    const errors = {
        email: '',
        password: '',
    };
    // Login..
    if (err.message === 'Email Address Not Registered') {
        errors['email'] = err.message;
    }
    if (err.message === 'Incorrect Password') {
        errors['password'] = err.message;
    }
    // Sign Up..
    if (err.code === 11000) {
        errors['email'] = 'Email Address Already Exists';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

// CRUD User DataBase..
async function getAllUsers() {
    return await (userModel.find({}, {
        '_id': 0,
        '__v': 0
    }));
}

async function getUser(id) {
    const truth = id.length;
    if (truth > 22) {
        return await (userModel.findOne({
            $or: [
                { '_id': id },
                { email: id },
            ]
        }, {
            '_id': 0,
            '__v': 0
        }));
    }
    return await (userModel.findOne({
        email: id,
    }, {
        '_id': 0,
        '__v': 0,
    }));
}

async function postUser(req) {
    try {
        const { email, password } = req.body;
        return await (userModel.create({
            email,
            password
        }));
    } catch (err) {
        return errorHandler(err);
    }
}

async function updateUser(req) {
    try{
        const userId = req.params.id;
        const { email, password } = req.body;
        const truth = userId.length;
        if(truth > 22) {
            return await userModel.findOneAndUpdate({
                $or: [
                    { '_id': userId },
                    { email: userId }
                ]
            }, {
                email,
                password,
            }, {
                new: true,
                upsert: true,
            });
        }
        return await userModel.findOneAndUpdate({
            email: userId
        }, {
            email,
            password,
        }, {
            new: true,
            upsert: true,
        });
    } catch(err) {
        return errorHandler(err);
    }
}

async function postLogin(req) {
    try{
        const { email, password } = req.body;
        const user = getUser(email);
        if(!user._id) {
            throw new Error('Email Address not Registered');
        }
        if(user._id) {
            const auth = await bcrypt.compare(password, user.password);
            if(!auth) {
                throw new Error('Incorrect Password');
            }
            return user;
        }
    } catch(err) {
        return errorHandler(err);
    }
}

// Export CRUD Functions..
module.exports = {
    getAllUsers,
    getUser,
    postUser,
    updateUser,
    postLogin,
};