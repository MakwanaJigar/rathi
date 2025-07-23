import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItem, updateItem } from "../../redux/actions/itemActions";

const ItemEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Item ID from route param

  const items = useSelector(state => state.item.items);
  const existingItem = items.find(i => i.id === parseInt(id)); // find by id

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [hsn, setHsn] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setName(existingItem.name || "");
      setWeight(existingItem.approx_weight || "");
      setHsn(existingItem.hsn_code || "");
    }
  }, [existingItem]);

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!name.trim() || !weight.trim() || !hsn.trim()) {
      setAlert({ type: "danger", text: "All fields are required." });
      return;
    }

    setLoading(true);

    const payload = { name, approx_weight: weight, hsn_code: hsn };
    const { ok, message } = id
      ? await dispatch(updateItem(id, payload))
      : await dispatch(addItem(payload));

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
          <i className="fa-solid fa-angles-right" /> {id ? "Edit" : "Add"} Item
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title"><h3>Item</h3></div>
            <div className="make-list-btns">
              <button className="export-btn" onClick={() => navigate("/item")}>
                Go Back
              </button>
            </div>
          </div>

          <div className="form-section client-info-container">
            <h3>{id ? "Edit" : "Add"} Item</h3>

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
                {loading ? "Submitting…" : (id ? "Update" : "Add")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemEdit;
