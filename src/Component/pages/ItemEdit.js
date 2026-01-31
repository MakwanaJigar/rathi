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
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (existingItem) {
      setName(existingItem.name || "");
      setWeight(existingItem.approx_weight || "");
      setHsn(existingItem.hsn_code || "");
    }
  }, [existingItem]);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !weight.trim() || !hsn.trim()) {
      showNotification("error", "All fields are required.", 0);
      return;
    }

    setLoading(true);

    const payload = { name, approx_weight: weight, hsn_code: hsn };
    const { ok, message } = id
      ? await dispatch(updateItem(id, payload))
      : await dispatch(addItem(payload));

    setLoading(false);

    if (ok) {
      showNotification("success", message || (id ? "Item updated successfully!" : "Item added successfully!"));
      setTimeout(() => navigate("/item"), 2000);
    } else {
      showNotification("error", message || "Failed to process item", 0);
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
