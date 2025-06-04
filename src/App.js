import './App.css';
import './mobile.css';
import Login from './Component/partial/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Component/pages/Home';
import Navbar from './Component/pages/Navbar';
import DeliveryChallan from './Component/pages/DeliveryChallan';
import ChallanAdd from './Component/pages/ChallanAdd';
import Client from './Component/pages/Client';
import SalesRepresentative from './Component/pages/SalesRepresentative';
import Make from './Component/pages/Make';
import ForgotPassword from './Component/partial/ForgotPassword';
import ConfirmPassword from './Component/partial/ConfirmPassword';
import User from './Component/pages/User';
import AddUser from './Component/pages/AddUser';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only if not on login page */}
      {
      location.pathname !== '/login' && location.pathname !== '/forgotpassword' && location.pathname !== '/confirmpassword' && <Navbar />
      }

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/delivery-challan" element={<DeliveryChallan />} />
        <Route path="/challan-add" element={<ChallanAdd />} />
        <Route path="/client" element={<Client />} />
        <Route path="/sales-representative" element={<SalesRepresentative />} />
        <Route path="/make" element={<Make />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="/user" element={<User />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </>
  );
}

export default App;
