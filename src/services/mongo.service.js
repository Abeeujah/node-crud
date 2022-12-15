// Require Mongoose..
const mongoose = require('mongoose');

// Define MongoUrl..
const mongoUrl = process.env.MONGO_URL;

// Mongo EventEmitters..
mongoose.connection.once('connection', () => {
    console.log("Connected To Database Successfully");
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

// Mongo Connections..
async function mongoConnect() {
    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}