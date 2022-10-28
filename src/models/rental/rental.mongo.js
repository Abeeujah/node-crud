// Require Mongoose..
const mongoose = require('mongoose');

// Create Rentals Schema..
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 255,
            },
            isGold: {
                type: Boolean,
                required: true,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            }
        }),
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 50,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255,
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0,
    }
});

// Rental Model..
const rentalModel = mongoose.model('Rental', rentalSchema);

// Export Rental Schema and Model..
module.exports = {
    rentalSchema,
    rentalModel,
};