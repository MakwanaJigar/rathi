import React from "react";
import { Link, NavLink } from "react-router-dom";

const Client = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* <!-- Sidebar --> */}
          <div className="col-12 col-md-3 col-lg-2 sidebar">
            <nav className="nav flex-column">
              <Link className="nav-link  sidebar-links" to="/">
                <i className="fa-solid fa-house"></i>
                Dashboard
              </Link>
              <Link
                className="nav-link active sidebar-links"
                to="/delivery-challan"
              >
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
                  <Link className="dropdown-item" to="/challan-add">
                    Add Challan
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/delivery-challan">
                    Delivery Challan
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/home">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* <!-- Main Content --> */}
          <div className="col-12 col-md-9 col-lg-10 main-content">
            <div className="delivery-challan-top-title-container">
              <h3 className="main-container-title">Client</h3>
              <div className="export-addnew-btn0-container">
                 <a href="">
                  <i className="fa-solid fa-download"></i> Import Now
                </a>
                <a href="">
                  <i className="fa-solid fa-download"></i> Export Now
                </a>
                <a href="">
                  <i className="fa-solid fa-plus"></i> Add Client
                </a>
              </div>
            </div>

            {/* MAIN TABLE DATA */}
            <div className="container mt-3">
              <table className="table align-middle table-bordered">
                <thead className="table-light ">
                  <tr>
                    <th className="fw-300">Company Name</th>
                    <th className="fw-300">Phone</th>
                    <th className="fw-300">Email Id</th>
                    <th className="fw-300">GST No.</th>
                    <th className="fw-300">Address</th>
                    <th className="fw-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-sm">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                   <tr>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-sm">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                   <tr>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-sm">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
