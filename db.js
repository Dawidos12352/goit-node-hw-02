const mongoose = require('mongoose');
const MONGODB_URI = " ";
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useUnifieldTopology: true,
        });
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
}
module.exports = dbConnect