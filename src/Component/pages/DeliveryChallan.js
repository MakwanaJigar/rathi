import React from "react";
// import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const DeliveryChallan = () => {
  const navigation = useNavigate()
  // const challanData = useSelector((state) => state.form.challanData);

  return (
    <>
      <div className="container-fluid">
        {/* <!-- Main Content --> */}
        <div className="main-content ">
          <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Delivery Challan </p>
          <div className="delivery-challan-top-title-container">
            <h3 className="main-container-title">Delivery Challan</h3>
            <div className="export-addnew-btn0-container">
              <a href="">
                <i className="fa-solid fa-upload"></i> Export Now
              </a>
              <Link to="/challan-add">
                <i className="fa-solid fa-plus"></i> Add New
              </Link>
            </div>
          </div>

          {/* MAIN TABLE DATA */}
          <div className=" mt-3">
            {/* {Object.keys(challanData).length === 0 ? (
              <p>No data submitted yet.</p>
            ) : ( */}
              <table className="table align-middle table-bordered">
                <thead className="table-light ">
                  <tr>
                    <th className="fw-300">D.O. Date</th>
                    <th className="fw-300">D.O. No.</th>
                    <th className="fw-300">Party Name</th>
                    <th className="fw-300">Total Weight</th>
                    <th className="fw-300">Ageing</th>
                    <th className="fw-300">Material Readiness</th>
                    <th className="fw-300">D. Status</th>
                    <th className="fw-300 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td>Pending</td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm">
                        <i class="fa-solid fa-cart-shopping"></i>
                      </button>
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm me-1">
                        <i className="fa fa-download"></i>
                      </button>
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* ) } */}

            {/* DELETE MODAL  */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteModalLabel">Delete Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <textarea name="" id="" cols={60} rows={3} className="delete-modal-textarea"></textarea>
                  </div>
                  <div className="modal-footer d-flex align-itmes-start justify-content-start">
                    <button type="button" className="btn btn-danger ">Delete</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryChallan;
