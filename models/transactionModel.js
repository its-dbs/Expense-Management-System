const mongoose = require("mongoose");


//creating transaction schema
const transactionSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required:[true, 'amount is required'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
    },

    category:{
        type: String,
        required:[true,'category is required'],
    },

    reference:{
        type: String,
        required:[true,'reference is required'],
    },

    description:{
        type: String,
        required:[true, 'desc is required'],
    },

    date:{
        type: Date,
        required:[true, 'date is required'],
    },
},
    {timestamps: true}
);


//exporting the model
const transactionModel = mongoose.model("transactions", transactionSchema);

module.exports = transactionModel;

