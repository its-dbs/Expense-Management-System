const mongoose = require("mongoose");

//basic connection function
const connectDB = async() => {
    try{
        //waiting for connection from url that is in env file
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server Running on ${mongoose.connection.host}`);
    }
    catch(error){
        console.log(`${error}`);
    }
};

module.exports = connectDB;