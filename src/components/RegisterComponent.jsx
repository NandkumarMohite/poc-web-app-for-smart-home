import React, { useState } from "react";
import axios from "axios";

function RegistrationComponent() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [given_name, setGiven_name] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        try {
            const response = await axios.post("https://ucng2iletd.execute-api.us-east-1.amazonaws.com/dev/register", { username, email, address, gender, given_name, password });


            // if (response.ok) {
            //   // Registration successful, handle the response as needed
            //   console.log("User registered successfully!");
            // } else {
            //   // Registration failed, handle the error response
            //   console.error("Error registering user:", response.statusText);
            // }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }

    };

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
        </div>
        </div>
    );
}

export default RegistrationComponent;

