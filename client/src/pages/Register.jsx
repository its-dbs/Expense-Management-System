import React, {useState, useEffect} from "react";
import {Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/RegisterPage.css";

const Register = () => {
    
//used to redirect to another page
const navigate = useNavigate();

//creating loading state
const [loading, setLoading] = useState(false);
    
    //form submit
    //sending the data to database
        const submitHandler = async (values) =>
        {
            try {
                // provided code is making an asynchronous HTTP POST request to the server
                // at the /userRoute/register route, sending along the values object as data. 
                //The await keyword indicates that the code will wait for the request to complete before continuing execution.

                setLoading(true);
                //req
                //console.log(values);
                await axios.post("/users/register", values);
                //res or interaction
                message.success("Registration Successful");
                setLoading(false);
                navigate("/login");

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
        
    //Register Form
    return (
    <>
    <div className="register-page">
        
        {/*checking if the loading condition is true and adding the loading component*/}
        {loading && <Loading />}

        <Form 
            className="register-form"
            layout="vertical" 
            onFinish={submitHandler}>
        <h2> Register Form</h2>
           <Form.Item label="Name: " name="name">
                <Input type="text" required />
            </Form.Item> 

            <Form.Item label="Email Id: " name="email">
                <Input type="email" required/>
            </Form.Item> 

            <Form.Item label="Password: " name="password">    
                <Input type="password" required/>
            </Form.Item> 

            <div className="d-flex justify-content-between">
                <Link to="/Login"> Already Registered ? Click here to login</Link>
                <button className="btn"> Register</button>
            </div>
        </Form>
    </div>
    </>
  );
};

export default Register;