// Require Customer Model..
const customerModel = require('./customer.mongo');

// Database CRUD..
async function getCustomers() {
    return await customerModel.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function getCustomer(id) {
    const truth = id.length;
    if (truth >= 22) {
        return await customerModel.findOne({
            $or: [
                { '_id': id },
                { name: id },
                { phone: id },
            ]
        });
    } else {
        return await customerModel.findOne({
            $or: [
                { name: id },
                { phone: id },
            ]
        });
    }
}

async function addCustomer(customer) {
    return await customerModel.findOneAndUpdate({
        isGold: customer.isGold,
        name: customer.name,
        phone: customer.phone,
    }, customer, {
        new: true,
        upsert: true,
    });
}

async function updateCustomer(req) {
    const id = req.params.id;
    if (id >= 22) {
        return await customerModel.findOneAndUpdate({
            $or: [
                { '_id': id },
                { name: id },
                { phone: id },
            ],
        }, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
        }, { new: true });
    } else {
        return await customerModel.findOneAndUpdate({
            $or: [
                { name: id },
                { phone: id },
            ],
        }, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
        }, { new: true });
    }
    
}

async function delCustomer(id) {
    const truth = id.length;
    if (truth >= 22) {
        return await customerModel.findOneAndDelete({
            $or: [
                { '_id': id },
                { name: id },
                { phone: id },
            ]
        });
    } else {
        return await customerModel.findOneAndDelete({
            $or: [
                { name: id },
                { phone: id },
            ]
        });
    }
}

// Export CRUD Functions..
module.exports = {
    getCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    delCustomer,
}