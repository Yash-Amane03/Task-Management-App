const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("MONGO connected successfully!!!");
        
    } catch (error) {
        console.error("Errorconnecting mongo",error);
        process.exit(1);
    }
};

module.exports = connectDB;