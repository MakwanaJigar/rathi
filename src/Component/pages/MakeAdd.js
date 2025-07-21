import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakeAdd = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (name.trim() === "") {
      setAlert({ type: "danger", text: "Make name is required." });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "https://replete-software.com/projects/rathi/api/addmake",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
  setAlert({
    type: "success",
    text: data?.message || "Make added successfully!",
  });

  setSubmitting(true);
  setTimeout(() => navigate("/make"), 2000);
} else {
  setAlert({
    type: "danger",
    text: data?.message || "Something went wrong, please try again.",
  });
  setSubmitting(false);
}

    } catch (err) {
      console.error("Error:", err);
      setAlert({
        type: "danger",
        text: err.message || "Unexpected error occurred.",
      });
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setAlert(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Master{" "}
          <i className="fa-solid fa-angles-right"></i> Make Add
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
            <h3>Add Make</h3>

            {/* Alert */}
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
                    className="form-control"
                    id="name"
                    placeholder="Enter Make Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={submitting}
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
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>

                <button
                  type="reset"
                  className="btn btn-clear px-4"
                  disabled={submitting}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAdd;
