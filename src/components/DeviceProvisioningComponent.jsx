import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

const DeviceProvisioningComponent = () => {
  const [step, setStep] = useState(0);
  const [lightBubldeviceId, setLightBubldeviceId] = useState('');
  const [motionSensordeviceId, setMotionSensordeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkAuthorityOfDeviceUser, setCheckAuthorityOfDeviceUser] = useState(0);
  const [AccessToken, setAccessToken] = useState("");
  const [IdToken, setIdToken] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    setAccessToken(localStorage.getItem("AccessToken"));
    setIdToken(localStorage.getItem("IdToken"));
  }, [])

//   useMemo(()=>{
// if(step ===4){
//   setStep(5);
// }
//   },[step])
const handleClickData = () =>{
  setStep(4);
}
  const handleClick = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 5000);
    } else if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 5000);
    }
  };

  const handleYes = () => {
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': IdToken,
      'accesstoken': AccessToken
    };
    let thingNames = [lightBubldeviceId, motionSensordeviceId];

    if (checkAuthorityOfDeviceUser < 2) {
      thingNames.forEach(async (thingName) => {
        try {
          console.log(thingName);
          setLoading(true);
          const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/authorizeThings", { thingName }, { headers: headers });
          console.log(response.data.avaibality);
          if (response.data.avaibality == true) {
            setCheckAuthorityOfDeviceUser(prevState => prevState + 1);
            
          }
        } catch (error) {
          console.log("error", error);
          setCheckAuthorityOfDeviceUser(3);
          toast.error('Failed to authorize device. Please try again.');
        } finally {
          setLoading(false);
          setStep(6);
        }
      });
    };
    if(checkAuthorityOfDeviceUser == 2 && lightBubldeviceId!=null && motionSensordeviceId!=null ){

      console.log("data", "checkAuthorityOfDeviceUser", checkAuthorityOfDeviceUser)
      // https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/registerTheThingtoUser

      try {
        setLoading(true);
        const response = await axios.post("https://gwhx3x3g47.execute-api.us-east-1.amazonaws.com/dev/registerTheThingtoUser", { thingNames }, { headers: headers });
        console.log(response.data)
        if (response.data.message == "Successfully Registerd two thing") {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setStep(5);
            setCheckAuthorityOfDeviceUser(0);
          }, 5000);
        } 

      } catch (error) {
        console.log("error", error);
        toast.error('Failed to authorize device. Please try again.');
      } 

    }

    console.log("checkAuthorityOfDeviceUser",checkAuthorityOfDeviceUser);
    // Simulate device registration
  };

  return (
    <div className="container" >
      {step === 0 && <div className="message" onClick={handleClick} >Hi</div>}
      {step === 1 && <div className="message" onClick={handleClick}>Welcome aboard!</div>}
      {step === 2 && (
        <div className="message">
          Is your device ready to connect?
          <button onClick={handleYes}>Yes</button>
        </div>
      )}
      {step === 3 && (
        <div className="message">
          Enter your motion detector device ID:
          <form onSubmit={handleClickData}>
            <input type="text" value={lightBubldeviceId} onChange={(e)=> setLightBubldeviceId(e.target.value)} />
            <button type="submit">Check Device Authority</button>
          </form>
        </div>
      )}
      {step === 4 && (
        <div className="message">
          Enter your light bulb device ID:
          <form onSubmit={handleSubmit}>
            <input type="text" value={motionSensordeviceId} onChange={(e) => setMotionSensordeviceId(e.target.value)} />
            <button type="submit">Check Device Authority</button>
          </form>
        </div>
      )}
      {checkAuthorityOfDeviceUser === 2 && (
        <div className="message">
          Your device IDs:
          <form onSubmit={handleSubmit}>
            <input type="text" value={lightBubldeviceId}  />
            <input type="text" value={motionSensordeviceId}  />
            <button type="submit" >Register My Device</button>
          </form>
        </div>
      )}
      {checkAuthorityOfDeviceUser > 2 && (
        <div className="message">
          Your device IDs:
          <form>
            <input type="text" value={lightBubldeviceId}/>
            <input type="text" value={motionSensordeviceId}/>
            <h1>You are not authorized user for these devices</h1>
          </form>
        </div>
      )}
      {step === 5 && <div className="message">Device successfully connected!</div>}
    </div>
  );
};

export default DeviceProvisioningComponent;
