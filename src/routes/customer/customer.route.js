// Require Express and Controller..
const express = require('express');
const {
    httpGetAllCustomers,
    httpGetCustomer,
    httpAddCustomer,
    httpUpdateCustomer,
    httpDeleteCustomer,
} = require('./customer.controller');

// Init Router..
const customerRouter = express.Router();

// Designate Routes..
customerRouter.get('/', httpGetAllCustomers);
customerRouter.get('/:id', httpGetCustomer);
customerRouter.post('/', httpAddCustomer);
customerRouter.put('/:id', httpUpdateCustomer);
customerRouter.delete('/:id', httpDeleteCustomer);

// Export Router..
module.exports = customerRouter;