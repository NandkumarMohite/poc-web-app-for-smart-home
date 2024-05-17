import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';
import ConfirmAccountComponent from "./ConfirmAccountComponent";

function RegistrationComponent() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [given_name, setGiven_name] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        try {
            const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/register", 
            { username, email, address, gender, given_name, password });

            if(response.data.status=200){

                toast.success("Registration successfull please login");
                localStorage.setItem('username',username);
                localStorage.setItem('password',password);
                // <ConfirmAccountComponent username={username} password={password}  />
            }

            setTimeout(() => {
                navigate("/confirmAccount");
              }, 5000);
            
        } catch (error) {
            if(error.message.includes("500")){
                toast.error("User Name Alreday exsist please sign in");
            }
           
        }
    };
    const handleClickLogin = () =>{
        navigate("/")
    }

    return (
        <div className="container">
                  <div class="circle">


            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Gender">Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={gender}
                        onChange={(e)=> setGender(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Name">Name:</label>
                    <input
                        type="text"
                        name="given_name"
                        placeholder="Given Name"
                        value={given_name}
                        onChange={(e)=> setGiven_name(e.target.value)}
                    />
                </div>    
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={handleClickLogin} style={{marginTop:"20px"}}>Go To Login</button>
        </div>
        </div>
    );
}

export default RegistrationComponent;

