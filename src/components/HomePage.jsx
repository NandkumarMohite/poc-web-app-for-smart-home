import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast} from 'react-toastify';


const HomePage = () => {
    const [AccessToken, setAccessToken] = useState(""); 
    const [IdToken, setIdToken] = useState(""); 
    const navigate = useNavigate();

    const [message, setMessage] = useState('motion_detected');
    useEffect(()=>{
        // console.log(localStorage.getItem("AccessToken"))
        setIdToken(localStorage.getItem("IdToken"));
        setAccessToken(localStorage.getItem("AccessToken"));
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': localStorage.getItem("IdToken"),
                    'accesstoken': localStorage.getItem("AccessToken")
                };
                const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/checkIsUserHasThings", {}, {headers: headers});
                if (!response.data.hasThings) {
                    // Handle the case where user doesn't have things
                }
            } catch (error) {
                navigate("/DeviceProvisioning");
                console.error("Error:", error.message);
            }
        };
    
        fetchData();
    },[])

    const handleMotionDetection = async (e) => {
        try {
            const headers = {
                'Authorization': IdToken,
                'accesstoken': AccessToken
              };
             
            const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/publish-to-iot", {message}, {headers: headers});
            toast(response.data.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleUpdateHoliday = async (e) => {
        try {
            const headers = {
                'Authorization': IdToken,
                'accesstoken': AccessToken
              };
            const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/holiday",{},{ headers: headers });
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


