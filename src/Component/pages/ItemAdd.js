import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/actions/itemActions";

const ItemAdd = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const [name,  setName]  = useState("");
  const [weight,setWeight]= useState("");
  const [hsn,   setHsn]   = useState("");
  const [alert, setAlert] = useState(null);
  const [loading,setLoading]= useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!name.trim() || !weight.trim() || !hsn.trim()) {
      setAlert({ type: "danger", text: "All fields are required." });
      return;
    }

    setLoading(true);
    const { ok, message } = await dispatch(
      addItem({ name, approx_weight: weight, hsn_code: hsn })
    );
    setLoading(false);

    if (ok) {
      setAlert({ type: "success", text: message });
      setTimeout(() => navigate("/item"), 1000);
    } else {
      setAlert({ type: "danger", text: message });
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Item Add
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Item</h3>
            </div>
            <div className="make-list-btns">
              <button className="export-btn" onClick={() => navigate("/item")}>
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>Add Item</h3>

            {alert && (
              <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}

            <form onSubmit={submit}>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Item Name</label>
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
                <label className="col-sm-2 col-form-label">Approx Weight</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">HSN Code</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={hsn}
                    onChange={(e) => setHsn(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-submit" disabled={loading}>
                {loading ? "Submitting…" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemAdd;
