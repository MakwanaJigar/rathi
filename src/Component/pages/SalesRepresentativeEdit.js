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

  const adding = useSelector((s) => s.salesRep.adding);

  /* notification state */
  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success' or 'error'
    message: "",
  });

  // Show notification utility
  const showNotification = (type, message, duration = 0) => {
    setNotification({
      show: true,
      type,
      message,
    });

    // Auto-hide after duration (if duration > 0)
    if (duration > 0) {
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, duration);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      showNotification("error", "All fields are required.", 0);
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
      showNotification("success", result.message || "Representative updated successfully!");
      setTimeout(() => navigate("/sales-representative"), 2000);
    } else {
      showNotification("error", result.message || "Failed to update representative", 0);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
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

            {/* Modal Notification */}
            {notification.show && (
              <div
                className="modal d-block"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1050,
                }}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  style={{ maxWidth: "450px" }}
                >
                  <div className="modal-content border-0">
                    <div
                      className={`modal-header border-0 ${"bg-" + (notification.type === "success" ? "success" : "danger")} text-white`}
                      style={{ padding: "20px" }}
                    >
                      <h5 className="modal-title fw-bold" style={{ fontSize: "18px" }}>
                        {notification.type === "success"
                          ? "✓ Success!"
                          : "✗ Error!"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() =>
                          setNotification((prev) => ({ ...prev, show: false }))
                        }
                      ></button>
                    </div>
                    <div className="modal-body" style={{ padding: "25px" }}>
                      <p className="mb-0" style={{ fontSize: "16px", lineHeight: "1.6" }}>
                        {notification.message}
                      </p>
                    </div>
                    <div className="modal-footer border-0" style={{ justifyContent: "center", padding: "15px" }}>
                      <button
                        type="button"
                        className={`btn btn-${
                          notification.type === "success" ? "success" : "danger"
                        } px-4`}
                        onClick={() =>
                          setNotification((prev) => ({ ...prev, show: false }))
                        }
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
