const mongoose = require('mongoose')
const { MONGODB_URI } = require("../config/env")

mongoose.set('strictQuery', false)
const connectDB = async () => {

    try {
        mongoose.set("strictQuery", false);
        const connection = await mongoose.connect(
            MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Connect in ${url}`)
    } catch (error) {
        console.log(`erro:${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;