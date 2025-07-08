import React from 'react';
import { useSidebar } from '../../Context/SidebarContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen } = useSidebar();

    // Check if the current route matches the link path
    const isActive = (targetPath) => location.pathname === targetPath;

    return (
        <div className={`col-12 col-md-3 col-lg-2 sidebar ${isSidebarOpen ? 'd-block' : 'd-none'}`}>
            <nav className="nav flex-column">

                {/* Dashboard */}
                <Link
                    className={`nav-link sidebar-links d-flex align-items-center gap-2 ${isActive('/') ? 'active' : ''}`}
                    to="/"
                >
                    <i className="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </Link>

                {/* Delivery Challan */}
                <Link
                    className={`nav-link sidebar-links d-flex align-items-center gap-2 ${isActive('/delivery-challan') ? 'active' : ''}`}
                    to="/delivery-challan"
                >
                    <i className="fa-solid fa-house"></i>
                    {/* <i class="fa-solid fa-file-invoice-dollar invoiceicon"></i> */}
                    <span>Delivery Challan</span>
                </Link>

                {/* Master Menu */}
                <button
                    className="nav-link sidebar-links btn btn-link text-start w-100 d-flex align-items-center justify-content-between"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#masterCollapse"
                    aria-expanded="false"
                    aria-controls="masterCollapse"
                >
                    <span className="d-flex align-items-center gap-2">
                        <i className="fa-solid fa-house"></i>
                        Master
                    </span>
                    <i className="fa-solid fa-angle-down"></i>
                </button>

                <div className="collapse" id="masterCollapse">
                    <ul className="list-unstyled ps-4">
                        <li>
                            <Link className={`nav-link sidebar-links ${isActive('/client') ? 'active' : ''}`} to="/client">Client</Link>
                        </li>
                        <li>
                            <Link className={`nav-link sidebar-links ${isActive('/sales-representative') ? 'active' : ''}`} to="/sales-representative">Sales Representative</Link>
                        </li>
                        <li>
                            <Link className={`nav-link sidebar-links ${isActive('/item') ? 'active' : ''}`} to="/item">Item</Link>
                        </li>
                        <li>
                            <Link className={`nav-link sidebar-links ${isActive('/make') ? 'active' : ''}`} to="/make">Make</Link>
                        </li>
                        <li>
                            <Link className={`nav-link sidebar-links ${isActive('/user') ? 'active' : ''}`} to="/user">User</Link>
                        </li>
                    </ul>
                </div>

                {/* Report Menu */}
                <button
                    className="nav-link sidebar-links btn btn-link text-start w-100 d-flex align-items-center justify-content-between"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#Report"
                    aria-expanded="false"
                    aria-controls="Report"
                >
                    <span className="d-flex align-items-center gap-2">
                        {/* <i class="fa-solid fa-file" style={{color:" #00662f"}}></i> */}
                        <i className="fa-solid fa-house"></i>
                        Report
                    </span>
                    <i className="fa-solid fa-angle-down"></i>
                </button>

                <div className="collapse" id="Report">
                    <ul className="list-unstyled ps-4">
                        <li><Link className={`nav-link sidebar-links ${isActive('/logistics') ? 'active' : ''}`} to="/logistics">Logistics</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/pending-logistics') ? 'active' : ''}`} to="/pending-logistics">Pending Logistics</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/courier') ? 'active' : ''}`} to="/courier">Courier</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/tc-section') ? 'active' : ''}`} to="/tc-section">TC Section</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/w-kanbha') ? 'active' : ''}`} to="/w-kanbha">W.Kanbha</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/w-kuha') ? 'active' : ''}`} to="/w-kuha">W.Kuha</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/w-kubadthal') ? 'active' : ''}`} to="/w-kubadthal">W.Kubadthal</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/direct-party') ? 'active' : ''}`} to="/direct-party">Direct Party</Link></li>
                        <li><Link className={`nav-link sidebar-links ${isActive('/summary') ? 'active' : ''}`} to="/summary">Summary</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
