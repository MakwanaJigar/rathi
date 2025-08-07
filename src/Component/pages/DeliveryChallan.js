import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchChallans,
  deleteChallan,
  exportChallans,
} from "../../redux/actions/deliveryChallanActions";

const DeliveryChallan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, challans, error } = useSelector(
    (state) => state.deliveryChallan
  );

  const [selectedChallanId, setSelectedChallanId] = useState(null);

  useEffect(() => {
    dispatch(fetchChallans());
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedChallanId) {
      await dispatch(deleteChallan(selectedChallanId));
      dispatch(fetchChallans());
      setSelectedChallanId(null);
      document.querySelector("#deleteModal .btn-close").click(); 
    }
  };

  const handleExport = () => {
    dispatch(exportChallans());
  };




  // CALCULATING AGEING
   // ✅ Place the function here inside the component
  const calculateAgeing = (doDate) => {
    if (!doDate) return "-"; // No date

    const currentDate = new Date();
    const challanDate = new Date(doDate);

    const diffTime =  currentDate - challanDate; // in ms
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
  };


  // CALCULATING WEIGHT
  const calculateTotalWeight = (items) => {
  if (!items || items.length === 0) return 0;

  return items.reduce((total, item) => total + (parseFloat(item.qty_mt) || 0), 0);
};

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Delivery Challan
        </p>

        <div className="delivery-challan-top-title-container">
          <h3 className="main-container-title">Delivery Challan</h3>
          <div className="export-addnew-btn0-container">
            <a onClick={handleExport} className="btn me-2">
              <i className="fa-solid fa-upload"></i> Export Now
            </a>
            <Link to="/challan-add" className="btn">
              <i className="fa-solid fa-plus"></i> Add New
            </Link>
          </div>
        </div>

        <div className="mt-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : challans.length === 0 ? (
            <p>No data found.</p>
          ) : (
            <table className="table align-middle table-bordered">
              <thead className="table-light">
                <tr>
                  <th className="fw-300">D.O. Date</th>
                  <th className="fw-300">D.O. No.</th>
                  <th className="fw-300">Party Name</th>
                  <th className="fw-300">Total Weight</th>
                  <th className="fw-300">Ageing</th>
                  <th className="fw-300">Material Readiness</th>
                  <th className="fw-300">D. Status</th>
                  <th className="fw-300 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {challans.map((challan) => (
                  <tr key={challan.id}>
                    <td>{challan.do_date || "N/A"}</td>
                    <td>{challan.do_no || "N/A"}</td>
                    <td>{challan.party_name || "N/A"}</td>
                    <td>{calculateTotalWeight(challan.items) || "N/A"}</td>
                    <td>{calculateAgeing(challan.do_date) || "N/A"}</td>
                    <td>{challan.material_readiness || "N/A"}</td>
                    <td>{challan.items?.[0]?.status || "N/A"}</td>
                    <td className="text-center action-btns">
                      <button className="btn btn-sm">
                        <i className="fa-solid fa-cart-shopping"></i>
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
                      <button
                        className="btn btn-sm me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setSelectedChallanId(challan.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* DELETE MODAL */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Delivery Challan</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this delivery challan?</p>
                </div>
                <div className="modal-footer d-flex align-items-start justify-content-start">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallan;
