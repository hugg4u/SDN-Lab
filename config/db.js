const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connect to MongoDB successfully!")
            })
    } catch (error) {
        console.error('Failed to connect to MongoDB: ', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;