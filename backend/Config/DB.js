const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connection established`);
    } catch (error) {
        console.log(error);
        console.log("Mongo DB connection failed!!");
        process.exit(1);
    }
};
module.exports = connectDB;
