const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("Mongoose Connected Successfully");
    }
    catch(error){
        console.error("Database Connection Error:",error);
        process.exit(1);
    }
}

module.exports = connectDB;