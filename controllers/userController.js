//importing userModel to perform CRUD operations
const userModel = require("../models/userModel");

//login controller callbackfunction
const loginController = async (req, res) => {
    try {
        //comparing users email & pw with the one in db and then allow them to login
        //destructuring email & pw from body(where user will provide its input)
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });

        //condition to check user
        if (!user) {
            return res.status(404).send("User Not Found");
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        //sending error status code and a to display error
        res.status(400).json(
            {
                success: false,
                error,
            }
        );
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        //creating object of new user and taking data from the body
        const newUser = new userModel(req.body);
        //console.log(newUser);
        await newUser.save();
        res.status(201).json({
            sucsess: true,
            newUser,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error,
        });

    }
};


//export
module.exports = { loginController, registerController };