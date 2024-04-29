
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegisterComponent';
import HomePage from './components/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent/>}></Route>
          <Route path="/register" element={<RegistrationComponent/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
