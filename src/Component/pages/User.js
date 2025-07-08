import React from 'react'
import { Link } from 'react-router-dom'

const User = () => {
  return (
    <>
      <div className="container-fluid">
          {/* <!-- Main Content --> */}
          <div className=" main-content">
            <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> User</p>
            <div className="delivery-challan-top-title-container">
              <h3 className="main-container-title">User</h3>
              <div className="export-addnew-btn0-container">
                <a href="">
                  <i className="fa-solid fa-download"></i> Export Now
                </a>
                <Link to="/user-add">
                  <i className="fa-solid fa-plus"></i> Add New
                </Link>
              </div>
            </div>

            {/* MAIN TABLE DATA */}
            <div className=" mt-3">
              <table className="table align-middle table-bordered">
                <thead className="table-light ">
                  <tr>
                    <th className="fw-300">Name</th>
                    <th className="fw-300">User Name</th>
                    <th className="fw-300">Password</th>
                    <th className="fw-300">Warehouse Access</th>
                    <th className="fw-300">Status</th>
                    <th className="fw-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>lorem ipsum</td>
                    <td>lorem ipsum</td>
                    <td>******</td>
                    <td>lorem ipsum</td>
                    <td className='active-user'><p> Active</p></td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <i className="fas fa-trash"></i>
                      </button>
                      <button className="btn btn-sm me-1">
                        <i className="fas fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>



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
  )
}

export default User
