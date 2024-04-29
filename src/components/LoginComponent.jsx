import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast} from 'react-toastify';


function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API request to localhost:8000/SIGNIN
            const response = await axios.post("https://ucng2iletd.execute-api.us-east-1.amazonaws.com/dev/signIn", {
                username,
                password,
            });
            toast("sign in successful!");
            console.log(response.data.data.userId)
            localStorage.setItem("userId", response.data.data.userId)
            // Handle the response (e.g., redirect to dashboard, show success message)
            console.log("API response:", response.data);
            navigate("/home");
        } catch (error) {
            toast("Wow so easy!");
            // Handle errors (e.g., show error message)
            console.error("Error:", error.message);
        }
    };

    return (
        <>
            <div className="container">
                <div className="circle">
                <h2>Sign In</h2>
                    <form className="App" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />                </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />                </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        

        </>
    );
}

export default LoginComponent;