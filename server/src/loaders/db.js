const mongoose = require('mongoose')
const { MONGODB_URI } = require("../config/env")

mongoose.set('strictQuery', false)
module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log('MongoDB connected')
        } catch (error) {
            console.error(error)
        }
    }
    ,
    disconnect: async () => {
        try {
            await mongoose.connection.close(() => {
                console.log('MongoDB disconnected')
                process.exit(0)
            })
        } catch (error) {
            console.error(error)
        }
    }
}