// Require CRUD Functions..
const {
    getCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    delCustomer
} = require('../../models/customer/customer.model');

// Define HTTP Functions..
// GET All Customers..
async function httpGetAllCustomers(req, res) {
    const dbCustomers = await getCustomers();
    return(res.status(200).json(dbCustomers));
}

// GET a Customer..
async function httpGetCustomer(req, res) {
    const customerId = req.params.id;
    const customer = await getCustomer(customerId);
    if(!customer) {
        return(res.status(404).json({
            error: `Customer With The Given ID ${customerId} Not Found`,
        }));
    }
    return(res.status(200).json(customer));
}

// POST a Customer..
async function httpAddCustomer(req, res) {
    const customer = req.body;
    const customerName = customer.name;
    const customerPhone = customer.phone;
    const customerIsPublished = customer.isPublished;
    if (customerIsPublished === null) {
        customer.isPublished = (customerIsPublished === !null)
    }
    if(!customerName && !customerPhone) {
        return(res.status(400).json({
            error: "Bad Request, Missing Required Customer Field",
        }));
    }
    const createdCustomer = await addCustomer(customer);
    return(res.status(201).json(createdCustomer));
}

// PUT a Customer..
async function httpUpdateCustomer(req, res) {
    const customerId = req.params.id;
    const customer = await getCustomer(customerId);
    if(!customer) {
        return(res.status(404).json({
            error: `Customer With The Given ID ${customerId} Not Found`,
        }));
    }
    const update = req.body;
    if(!update.name || !update.phone){
        return(res.status(400).json({
            error: "Bad Request, Missing Required Customer Field",
        }));
    }
    const updatedCustomer = await updateCustomer(req);
    return(res.status(200).json(updatedCustomer));
}

// DELETE a Customer..
async function httpDeleteCustomer(req, res) {
    const customerId = req.params.id;
    const customer = await getCustomer(customerId);
    if(!customer) {
        return(res.status(404).json({
            error: `Customer With The Given ID ${customerId} Not Found`,
        }));
    }
    const deletedCustomer = await delCustomer(customerId);
    return(res.status(200).json(deletedCustomer));
}

// Export HTTP Functions..
module.exports = {
    httpGetAllCustomers,
    httpGetCustomer,
    httpAddCustomer,
    httpUpdateCustomer,
    httpDeleteCustomer,
}