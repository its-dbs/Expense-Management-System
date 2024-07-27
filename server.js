//initializing or importing libraries
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

// config dot env file
dotenv.config();

//database call
connectDB();

//creating rest object
//accesing all features of express using app.
const app = express();

//Middlewares
//configuring 
// app.use(morgan("dev"))
app.use(express.json())
// app.use(cors())

//adding Routes
//app.get(home directory/ url, call back function(req and res) )
// app.get('/', (req, res) => {
//     res.send('Hello from server!')
//    })

//main user route
app.use('/api/v1/users', require('./routes/userRoute'));

//Transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

//initializing port
//either take the port from .env file or use the one assigned
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})







