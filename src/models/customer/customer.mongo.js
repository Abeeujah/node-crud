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

// Init Customer Model..
const customerModel = mongoose.model('Customer', customerSchema);

// Export Schema and Model..
module.exports = {
    customerSchema,
    customerModel,
};