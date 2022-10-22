// Require HTTP Module..
const http = require('http');

// Require app..
const app = require('./app');

// Create Server..
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Start Server..
async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();