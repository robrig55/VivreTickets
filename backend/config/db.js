const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" })

const db = process.env.ATLAS_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(
            db
        )

        console.log('MongoDB is Connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;