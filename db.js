const mongoose = require('mongoose');
const { mongoConnectionString } = require("./config")


const dbConnect = async () => {
    try {
        await mongoose.connect(mongoConnectionString, {
            useUnifieldTopology : true,
            useNewUrlParser : true,
        });
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
}

const dbDisconnect = async () => {
    try {
        await mongoose.disconnect();

    } catch (error) {
        console.error(error);
        throw new Error( "Database disconnection failed", error.message);
    }
}
module.exports = {dbConnect, dbDisconnect};