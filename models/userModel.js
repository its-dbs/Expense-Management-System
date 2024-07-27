const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"],
    },
    email:{
        type: String,
        required: [true, "email is required & should be unique"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "password is required"],
    }
},
{timestamps: true}

);

//exporting
// const filename = mongoose.model('table name', reference)
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;