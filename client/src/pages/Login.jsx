import React, {useState, useEffect} from "react";
import {Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/Loginpage.css";
//import loginImg from "../components/images/transaction.jpg";



const Login = () => {

    //const img = loginImg;
    const img =  "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
//creating state
const [loading, setLoading] = useState(false);

//navigate link
const navigate = useNavigate();

    //form submit
    const submitHandler = async (values) =>
    {
        setLoading(true);
        try {
        //sending post request to server endpoint using axios lib
        //sends the form values to server for authentication 
        const {data} = await axios.post('/users/login', values);
       
        setLoading(false);

        message.success("Login successful");

        
        //use local storage, and converting the object values to string
        //copying the data values into local storage and emptying the value of pw
        localStorage.setItem("user", JSON.stringify({...data.user, password:''}));
        navigate("/");
        } 
        catch (error) {
            setLoading(false);
            message.error("Something went wrong!");
        }
    };

    //prevent for login user
    //if user exists they will be redirected to homepage directly
    useEffect(() => {
        if(localStorage.getItem("user"))
        {
            navigate("/");
        }
    }, [navigate]);

    //Login Function
  return (
<>
    <div className="login-page">

            {/*checking if the loading condition is true and adding the loading component*/}
            {loading && <Loading/>}

            <div className="row container">
                <h1 className="text-center"> Expense Management System</h1>
            <div className="col-md-6">
                <img src={img} alt="login-img" width={"100%"} height="100%" />
            </div>
        <div className="col-md-4 login-form">

        <Form layout="vertical" onFinish={submitHandler}>
        <h1> Login Form</h1>
            <Form.Item label="Email Id: " name="email">
                <Input type="email" required/>
            </Form.Item> 

            <Form.Item label="Password: " name="password">    
                <Input type="password" required/>
            </Form.Item> 

            <div className="d-flex justify-content-between">
                <Link to="/Register"> 
                    Not a user ? Click here to Register
                </Link>
                <button className="btn"> Login</button>
            </div>
        </Form>
    </div>
    </div>
    </div>
    </>
  );
};

export default Login;