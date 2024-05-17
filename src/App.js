
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegisterComponent';
import HomePage from './components/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import DeviceProvisioningComponent from './components/DeviceProvisioningComponent';
import ConfirmAccountComponent from './components/ConfirmAccountComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent/>}></Route>
          <Route path="/register" element={<RegistrationComponent/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/DeviceProvisioning" element={<DeviceProvisioningComponent />}></Route>
          <Route path="/confirmAccount" element={<ConfirmAccountComponent />}></Route>

        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
