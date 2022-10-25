// Require Mongoose..
const mongoose = require('mongoose');

// Create Customers Schema..
const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Customer', customerSchema);