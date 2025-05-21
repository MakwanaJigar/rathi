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

function App() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only if not on login page */}
      {location.pathname !== '/login' && <Navbar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/delivery-challan" element={<DeliveryChallan />} />
        <Route path="/challan-add" element={<ChallanAdd />} />
      </Routes>
    </>
  );
}

export default App;
