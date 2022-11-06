// Require Mongoose, Validator and Bcrypt..
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    isEmail,
} = require('validator');

// Define User Schema..
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Address is Required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please Enter A Valid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Password Required to Authenticate You'],
        minlength: [6, 'Password Cannot Be Shorter Than 6 Characters']
    }
});

// Hash User Passwords Using Mongoose Middleware and Bcrypt..
userSchema.pre('save', async function(next) {
    const salt = await (bcrypt.genSalt(10));
    this.password = await (bcrypt.hash(this.password, salt));
    next();
});

// Turn Schema into Model..
const userModel = mongoose.model('User', userSchema);

// Export User Model and Schema..
module.exports = {
    userSchema,
    userModel,
};