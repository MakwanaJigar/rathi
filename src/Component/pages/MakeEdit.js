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
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Show alert if no makeData found in state
  useEffect(() => {
    if (!makeData) {
      setAlert({
        type: "danger",
        text: "No make data found. Please navigate from the list page.",
      });
    }
  }, [makeData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (name.trim() === "") {
      setAlert({ type: "danger", text: "Make name is required." });
      return;
    }

    setSubmitting(true);

    try {
      const result = await dispatch(updateMake(id, { name: name.trim() }));

      if (result.ok) {
        setAlert({ type: "success", text: result.message });
        setTimeout(() => navigate("/make", { state: { refresh: true } }), 1200);
      } else {
        setAlert({ type: "danger", text: result.message });
      }
    } catch (err) {
      setAlert({ type: "danger", text: err.message || "Network error." });
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form to original data
  const handleReset = () => {
    setName(makeData?.name || "");
    setAlert(null);
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

            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
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
