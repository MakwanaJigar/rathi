import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  addSalesRep,
  updateSalesRep,
} from "../../redux/actions/representativeActions";

const SalesRepresentativeEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // get ID from URL for edit
  const location = useLocation();

  // If we're editing, the existing data comes from route state
  const repData = location.state?.repData || {};

  const [name, setName] = useState(repData.name || "");
  const [phone, setPhone] = useState(repData.phone || "");
  const [email, setEmail] = useState(repData.email || "");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const adding = useSelector((s) => s.salesRep.adding);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }

    const payload = { name, phone, email };
    let result;

    if (id) {
      // Update
      result = await dispatch(updateSalesRep(id, payload));
    } else {
      // Add
      result = await dispatch(addSalesRep(payload));
    }

    if (result.ok) {
      setSuccessMsg(result.message);
      setTimeout(() => navigate("/sales-representative"), 1500);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSuccessMsg("");
    setErrorMsg("");
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Sales Representative {id ? "Edit" : "Add"}
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Sales Representative</h3>
            </div>
            <div className="make-list-btns">
              <button
                className="export-btn"
                onClick={() => navigate("/sales-representative")}
              >
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>{id ? "Edit" : "Add"} Representative</h3>

            {successMsg && (
              <div className="alert alert-success">{successMsg}</div>
            )}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-submit" disabled={adding}>
                {adding ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="reset"
                className="btn btn-clear ms-2"
                disabled={adding}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentativeEdit;
