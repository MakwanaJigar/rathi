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
                            <div className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle sidebar-links btn btn-link text-start w-100"
                                    type="button"
                                    id="masterDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-house"></i> Master
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="masterDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/challan-add">
                                            Client
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/delivery-challan">
                                            Sales Representative
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/home">
                                            Make
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/home">
                                            User
                                        </Link>
                                    </li>
                                </ul>
                            </div>
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
