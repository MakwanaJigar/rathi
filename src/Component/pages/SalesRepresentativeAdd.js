import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSalesRep } from "../../redux/actions/representativeActions";

const SalesRepresentativeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* local input state */
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  /* redux add status */
  const adding   = useSelector((s) => s.salesRep.adding);
  const addError = useSelector((s) => s.salesRep.addError);

  /* success alert */
  const [successMsg, setSuccessMsg] = useState("");

  /* dispatch on submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const { ok, message } = await dispatch(addSalesRep({ name, phone, email }));
    if (ok) {
      setSuccessMsg(message);
      setTimeout(() => navigate("/sales-representative"), 1500);
    }
  };

  /* reset */
  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSuccessMsg("");
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Sales Representative Add
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Sales Representative</h3>
            </div>
            <div className="make-list-btns">
              <button className="export-btn" onClick={() => navigate("/sales-representative")}>
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>Add Representative</h3>

            {addError && <div className="alert alert-danger">Error: {addError}</div>}

           {!successMsg && addError && <div className="alert alert-danger">Error: {addError}</div>}


            <form onSubmit={handleSubmit} onReset={handleReset}>
              {/* name */}
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
              {/* phone */}
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
              {/* email */}
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
                    <span className="spinner-border spinner-border-sm me-2" /> Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              <button type="reset" className="btn btn-clear ms-2" disabled={adding}>
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentativeAdd;
