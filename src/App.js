// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './Assets/css/mobile.css'
import './Assets/css/style.css'

// Components
import Navbar from './Component/pages/Navbar';// Make sure this file exists
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
import { SidebarProvider } from './Context/SidebarContext';
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
import WarehouserEdit from './Component/pages/WarehouseEdit';
import WarehouseEdit from './Component/pages/WarehouseEdit';
import ItemEdit from './Component/pages/ItemEdit';
import SalesRepresentativeEdit from './Component/pages/SalesRepresentativeEdit';
import ClientEdit from './Component/pages/ClientEdit';

const App = () => {
  const location = useLocation();

  // Hide Navbar and Sidebar on auth pages
  const hideUIRoutes = ['/login', '/forgot-password', '/confirm-password'];
  const hideUI = hideUIRoutes.includes(location.pathname);

  return (
    <SidebarProvider>
      {!hideUI && <Navbar />}
      <div className="d-flex">
        {!hideUI && <Sidebar />}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/confirm-password" element={<ConfirmPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/delivery-challan" element={<DeliveryChallan />} />
            <Route path="/challan-add" element={<ChallanAdd />} />
            <Route path="/client" element={<Client />} />
            <Route path="/sales-representative" element={<SalesRepresentative />} />
            <Route path="/make" element={<Make />} />
            <Route path="/user" element={<User />} />
            <Route path="/user-add" element={<UserAdd />} />
            <Route path="/client-add" element={<ClientAdd />} />
            <Route path="/client/edit/:id" element={<ClientEdit />} />
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
            {/* <Route path="/make-edit" element={<MakeEdit />} /> */}
            <Route path="/item-add" element={<ItemAdd />} />
            <Route path="/item-edit/:id" element={<ItemEdit />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/sales-Representative-add" element={<SalesRepresentativeAdd />} />
            <Route path="/sales-representative-edit/:id" element={<SalesRepresentativeEdit />} />
            <Route path="/user-edit/:id" element={<UserEdit />} />
            <Route path="/warehouser-add" element={<WarehouserAdd />} />
            <Route path="/warehouse/edit/:id" element={<WarehouseEdit />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
