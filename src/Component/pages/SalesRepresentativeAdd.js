import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SalesRepresentativeAdd = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setAlert(null);

  if (!name.trim() || !phone.trim() || !email.trim()) {
    setAlert({ type: "danger", text: "All fields are required." });
    return;
  }

  setSubmitting(true);

  try {
    const payload = { name, phone, email };

    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/add_representative",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const text = await res.text();
    let data = {};

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response from server.");
    }

    console.log("Server response:", data);

    const message = data?.message?.toLowerCase() || "";

    const success =
      res.ok &&
      (
        data.status === 1 ||
        data.status === true ||
        data.success === 1 ||
        message.includes("success") ||
        message.includes("added")
      );

    if (success) {
      setAlert({ type: "success", text: data.message || "Representative added successfully!" });
      setTimeout(() => navigate("/sales-representative"), 1500);
    } else {
      throw new Error(data.message || "Failed to add representative.");
    }
  } catch (err) {
    setAlert({ type: "danger", text: err.message || "Something went wrong." });
  } finally {
    setSubmitting(false);
  }
};

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAlert(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Master
          <i className="fa-solid fa-angles-right"></i> Sales Representative Add
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Sales Representative</h3>
            </div>
            <div className="make-list-btns">
              <button className="export-btn" onClick={() => navigate("/sales-representative")}>
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>Add Representative</h3>

            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
              </div>
            )}

            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Representative Name"
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
                    type="tel"
                    className="form-control"
                    placeholder="Enter Phone Number"
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
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

export default SalesRepresentativeAdd;
