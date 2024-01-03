require("dotenv").config()
const mongoose = require("mongoose");

async function dbConnect() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_STRING);
        console.log("Database connected to: ", connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit();
    }
} 


module.exports = dbConnect