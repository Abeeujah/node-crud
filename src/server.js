// Require HTTP Module..
const http = require('http');
require('dotenv').config();

// Require app and services..
const app = require('./app');
const {
    mongoConnect,
} = require('./services/mongo.service');

// Create Server..
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Start Server..
async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();