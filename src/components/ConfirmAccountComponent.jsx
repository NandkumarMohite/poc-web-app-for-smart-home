import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function ConfirmAccountComponent() {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setPassword(localStorage.getItem('password'));
    }, [])
    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/signUpComfirmation",
                {
                    username,
                    password,
                    confirmationCode
                });

            console.log('Response:', response.data);
            if(response.data.status=200){
                localStorage.setItem("AccessToken", response.data.data.AuthenticationResult.AccessToken);
                localStorage.setItem("IdToken", response.data.data.AuthenticationResult.IdToken);
                toast.success("Account Confirmation succesfull");
            }
            // Handle successful response here
            navigate("/DeviceProvisioning");
        } catch (error) {

            console.error('Error:', error);
        }

    };
    return (
        <>
            <div className="message">
                Enter your OTP from email ID:
                <form onSubmit={handleSubmit}>
                    <input type="text" value={confirmationCode} onChange={handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
export default ConfirmAccountComponent;
