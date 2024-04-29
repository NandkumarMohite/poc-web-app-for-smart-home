import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast} from 'react-toastify';


const HomePage = () => {
    const [userId, setUserId] = useState(""); 
    const [message, setMessage] = useState('');
    useEffect(()=>{
        console.log(localStorage.getItem("userId"))
        setUserId(localStorage.getItem("userId"));
        setMessage("motion_detected");
    },[])
    const handleMotionDetection = async (e) => {
        try {
            const response = await axios.post("https://ucng2iletd.execute-api.us-east-1.amazonaws.com/dev/publish-to-iot", {userId,message});
            toast(response.data.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleUpdateHoliday = async (e) => {
        try {
            const response = await axios.post("https://ucng2iletd.execute-api.us-east-1.amazonaws.com/dev/holiday", {userId});
            console.log(response)
            toast(response.data.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Home Page</h1>
            </header>
            <main>
                <p>Welcome to our home automation system.</p>
                <div className="options">
                    <button onClick={handleMotionDetection}>Motion Detection</button>
                    <button onClick={handleUpdateHoliday}>Update Holiday Status</button>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Your Company</p>
            </footer>
        </div>
    );
}
 
export default HomePage;


