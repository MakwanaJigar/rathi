import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <div className="col-12 col-md-3 col-lg-2 sidebar">
                        <nav className="nav flex-column">
                            <Link className="nav-link active sidebar-links" to="/">
                                <i className="fa-solid fa-house"></i>
                                Dashboard
                            </Link>
                            <Link className="nav-link sidebar-links" to="/delivery-challan">
                                <i className="fa-solid fa-house"></i>
                                Delivery Challan
                            </Link>
                            <Link
                                className="nav-link dropdown-toggle sidebar-links "
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa-solid fa-house"></i> Master
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/challan-add">Add Challan</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/delivery-challan">Delivery Challan</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/home">Home</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* <!-- Main Content --> */}
                    <div className="col-12 col-md-9 col-lg-10 main-content">
                        <h3>Dashboard</h3>
                        <p>This is the main content area.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
