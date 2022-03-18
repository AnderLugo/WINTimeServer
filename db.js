const { connect }   = require('mongoose')
require("dotenv").config();

const connectDB     = async () => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports      = {connectDB};