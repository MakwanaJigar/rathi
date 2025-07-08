import React from "react";
import { Link, NavLink } from "react-router-dom";

const Client = () => {
  return (
    <>
      <div className="container-fluid">
          <div className=" main-content">
            <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> Client</p>
            <div className="delivery-challan-top-title-container">
              <h3 className="main-container-title">Client</h3>
              <div className="export-addnew-btn0-container">
                <a href="">
                  <i className="fa-solid fa-download"></i> Import Now
                </a>
                <a href="">
                  <i className="fa-solid fa-download"></i> Export Now
                </a>
                <Link to="/client-add">
                  <i className="fa-solid fa-plus"></i> Add Client
                </Link>
              </div>
            </div>

            {/* MAIN TABLE DATA */}
            <div className=" mt-3">
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
    </>
  );
};

export default Client;
