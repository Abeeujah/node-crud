// Require Model Functions..
const {
    getAllRentals,
    getRental,
    saveRental,
    updateRental,
    delRental,
} = require('../../models/rental/rental.model');

// Define HTTP Functions..
async function httpGetAllRentals(req, res) {
    const rentals = await getAllRentals();
    return (res.status(200).json(rentals));
}

async function httpGetRental(req, res) {
    const rentalId = req.params.id
    const rental = await getRental(rentalId);
    if (!rental) {
        return (res.status(404).json({
            error: "Rental Not Found",
        }));
    }
    return (res.status(200).json(rental));
}

async function httpSaveRentals(req, res) {
    const rentBody = req.body;
    if(!rentBody.customer || !rentBody.movie) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data..",
        }));
    }
    const rental = await saveRental(rentBody);
    return (res.status(201).json(rental));
}

async function httpUpdateRental(req, res) {
    const rentId = req.params.id;
    const rent = await getRental(rentId);
    if (!rent) {
        return (res.status(404).json({
            error: "Rental Not Found..",
        }));
    }
    const rentBody = req.body;
    if(!rentBody.customer || !rentBody.movie) {
        return (res.status(400).json({
            error: "Bad Request, Missing Required Data..",
        }));
    }
    const rental = await updateRental(req);
    return (res.status(200).json(rental));
}

async function httpDelRental(req, res) {
    const rentalId = req.params.id;
    const rental = await getRental(rentalId);
    if (!rental) {
        return (res.status(404).json({
            error: "Invalid Rental Details..",
        }));
    }
    const deletedRental = await delRental(rentalId);
    return (res.status(200).json(deletedRental));
}

// Export HTTP Functions..
module.exports = {
    httpGetAllRentals,
    httpGetRental,
    httpSaveRentals,
    httpUpdateRental,
    httpDelRental,
}