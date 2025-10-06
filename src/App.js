// src/App.js
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './Assets/css/mobile.css';
import './Assets/css/style.css';

// Components
import Navbar from './Component/pages/Navbar';
import Home from './Component/pages/Home';
import Login from './Component/partial/Login';
import ForgotPassword from './Component/partial/ForgotPassword';
import ConfirmPassword from './Component/partial/ConfirmPassword';
import DeliveryChallan from './Component/pages/DeliveryChallan';
import ChallanAdd from './Component/pages/ChallanAdd';
import Client from './Component/pages/Client';
import SalesRepresentative from './Component/pages/SalesRepresentative';
import Make from './Component/pages/Make';
import User from './Component/pages/User';
import AddUser from './Component/pages/AddUser';
import { SidebarProvider, useSidebar } from './Context/SidebarContext';
import Sidebar from './Component/pages/Sidebar';
import ClientAdd from './Component/pages/ClientAdd';
import Item from './Component/pages/Item';
import UserAdd from './Component/pages/UserAdd';
import Logistics from './Component/pages/Logistics';
import PendingLogistics from './Component/pages/PendingLogistics';
import PendingLogisticsAdd from './Component/pages/PendingLogisticsAdd';
import Courier from './Component/pages/Courier';
import TCSection from './Component/pages/TCSection';
import WKanbha from './Component/pages/WKanbha';
import WKuha from './Component/pages/WKuha';
import WKubadThal from './Component/pages/WKubadThal';
import DirectParty from './Component/pages/DirectParty';
import Summary from './Component/pages/Summary';
import MakeAdd from './Component/pages/MakeAdd';
import ItemAdd from './Component/pages/ItemAdd';
import Warehouse from './Component/pages/Warehouse';
import UserEdit from './Component/pages/UserEdit';
import SalesRepresentativeAdd from './Component/pages/SalesRepresentativeAdd';
import MakeEdit from './Component/pages/MakeEdit';
import WarehouserAdd from './Component/pages/WarehouseAdd';
import WarehouseEdit from './Component/pages/WarehouseEdit';
import ItemEdit from './Component/pages/ItemEdit';
import SalesRepresentativeEdit from './Component/pages/SalesRepresentativeEdit';
import ClientEdit from './Component/pages/ClientEdit';
import { useSelector } from 'react-redux';
import ChallanEdit from './Component/pages/ChallanEdit';
// import ChallanEdit from './Component/pages/ChallanEdit';

// Layout Wrapper to handle Sidebar shift
const Layout = ({ hideUI, children }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="app-layout d-flex">
      {!hideUI && <Sidebar />}
      <div
        className={`main-content-wrapper flex-grow-1 ${isSidebarOpen ? 'shifted' : ''}`}
        style={{
          transition: 'margin-left 0.3s ease-in-out',
          marginLeft: !hideUI && isSidebarOpen ? '240px' : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const token = auth?.token;

  // Hide Navbar and Sidebar on auth pages
  const hideUIRoutes = ['/login', '/forgot-password', '/confirm-password'];
  const hideUI = hideUIRoutes.includes(location.pathname);

  return (
    <SidebarProvider>
      {!hideUI && <Navbar />}
      <Layout hideUI={hideUI}>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/dashboard" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/delivery-challan" element={<DeliveryChallan />} />
          <Route path="/challan-add" element={<ChallanAdd />} />
          <Route path="/challan-edit/:id" element={<ChallanEdit />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client-add" element={<ClientAdd />} />
          <Route path="/client/edit/:id" element={<ClientEdit />} />
          <Route path="/sales-representative" element={<SalesRepresentative />} />
          <Route path="/make" element={<Make />} />
          <Route path="/user" element={<User />} />
          <Route path="/user-add" element={<UserAdd />} />
          <Route path="/item" element={<Item />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/pending-logistics" element={<PendingLogistics />} />
          <Route path="/pending-logistics-add" element={<PendingLogisticsAdd />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/tc-section" element={<TCSection />} />
          <Route path="/w-kanbha" element={<WKanbha />} />
          <Route path="/w-kuha" element={<WKuha />} />
          <Route path="/w-kubadthal" element={<WKubadThal />} />
          <Route path="/direct-party" element={<DirectParty />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/make-add" element={<MakeAdd />} />
          <Route path="/make-edit/:id" element={<MakeEdit />} />
          <Route path="/item-add" element={<ItemAdd />} />
          <Route path="/item-edit/:id" element={<ItemEdit />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/sales-Representative-add" element={<SalesRepresentativeAdd />} />
          <Route path="/sales-representative-edit/:id" element={<SalesRepresentativeEdit />} />
          <Route path="/user-edit/:id" element={<UserEdit />} />
          <Route path="/warehouser-add" element={<WarehouserAdd />} />
          <Route path="/warehouse/edit/:id" element={<WarehouseEdit />} />
        </Routes>
      </Layout>
    </SidebarProvider>
  );
};

export default App;
