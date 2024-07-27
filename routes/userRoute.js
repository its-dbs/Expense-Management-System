const express = require("express");
const { loginController, registerController, } = require("../controllers/userController");

//router object
const router = express.Router();

//routes
//POST || LOGIN  USER
//router.post('url pattern', call back function (but here we use controller))
router.post("/login",loginController);


//POST || REGISTER USER
router.post("/register",registerController);

//export
module.exports = router;