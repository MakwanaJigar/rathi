import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMake } from "../../redux/actions/makeActions"; // Adjust the path as needed

const MakeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const makeData = location.state?.makeData;
  const [name, setName] = useState(makeData?.name || "");
  const [submitting, setSubmitting] = useState(false);

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

  // Show alert if no makeData found in state
  useEffect(() => {
    if (!makeData) {
      showNotification("error", "No make data found. Please navigate from the list page.", 0);
    }
  }, [makeData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      showNotification("error", "Make name is required.", 0);
      return;
    }

    setSubmitting(true);

    try {
      const result = await dispatch(updateMake(id, { name: name.trim() }));

      if (result.ok) {
        showNotification("success", result.message || "Make updated successfully!");
        setTimeout(() => navigate("/make", { state: { refresh: true } }), 2000);
      } else {
        showNotification("error", result.message || "Failed to update make", 0);
      }
    } catch (err) {
      showNotification("error", err.message || "Network error.", 0);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form to original data
  const handleReset = () => {
    setName(makeData?.name || "");
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Master{" "}
          <i className="fa-solid fa-angles-right"></i> Make Edit
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Make</h3>
            </div>
            <div className="make-list-btns">
              <button className="export-btn" onClick={() => navigate("/make")}>
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>Edit Make</h3>

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
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Make
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Make Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="btn btn-submit px-4"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="reset"
                  className="btn btn-clear px-4"
                  disabled={submitting}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeEdit;
