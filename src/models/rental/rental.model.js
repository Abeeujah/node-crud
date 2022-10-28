// Require Rental Model..
const {
    rentalModel,
} = require('./rental.mongo');
const {
    getCustomer,
} = require('../customer/customer.model');
const {
    getMovie,
} = require('../movie/movie.model');

// CRUD Functions..
async function getAllRentals() {
    return await (rentalModel.find({}, {
        '_id': 0,
        '__v': 0,
    }));
}

async function getRental(id) {
    const truth = id.length;
    const movie = await getMovie(id);
    const customer = await getCustomer(id);
    if (truth >= 22) {
        return await (rentalModel.findOne({
            '_id': id,
        }));
    } else {
        return await (rentalModel.findOne({
            $or: [
                { movie, },
                { customer, }
            ]
        }))
    }
}

async function saveRental(rental) {
    const customer = await getCustomer(rental.customer);
    const movie = await getMovie(rental.movie);
    if (movie.numberInStock === 0) {
        return;
    }
    return await (rentalModel.findOneAndUpdate({
        customer,
        movie,
    }, {
        customer,
        movie,
    }, {
        new: true,
        upsert: true,
    }));
}

async function updateRental(req) {
    const rentalId = req.params.id;
    const rentalUpdate = req.body;
    const movie = await getMovie(rentalId);
    const customer = await getCustomer(rentalId);
    const truth = rentalId.length;
    const movieUpdate = await getMovie(rentalUpdate.movie);
    const customerUpdate = await getCustomer(rentalUpdate.customer);
    const update = { movieUpdate, customerUpdate };
    // const rental = await getRental(rentalId);
    // return await rentalModel.findOneAndUpdate(rental, update, { new: true });
    if (truth >= 22) {
        return await (rentalModel.findOneAndUpdate({
            $or: [
                { '_id': rentalId },
                { movie },
                { customer },
            ]
        }, update, {
            new: true
        }));
    } else {
        return await (rentalModel.findOneAndUpdate({
            $or: [
                { movie },
                { customer },
            ]
        }, update, {
            new: true,
        }));
    }
}

async function delRental(id) {
    const truth = id.length;
    const movie = await getMovie(id);
    const customer = await getCustomer(id);
    if (truth >= 22) {
        return await (rentalModel.findOneAndDelete({
            '_id': id,
        }));
    } else {
        return await (rentalModel.findOneAndDelete({
            $or: [
                { movie, },
                { customer, }
            ]
        }));
    }
}

// Export Functions..
module.exports = {
    getAllRentals,
    getRental,
    saveRental,
    updateRental,
    delRental,
}