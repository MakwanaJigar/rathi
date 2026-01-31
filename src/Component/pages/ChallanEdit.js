import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliveryChallan,
  updateDeliveryChallan,
  fetchChallans,
  clearUpdateSuccess,
  clearUpdateError,
  clearAddSuccess,
  clearAddError,
} from "../../redux/actions/deliveryChallanActions";
import { fetchMakes } from "../../redux/actions/makeActions";
import { fetchWarehouses } from "../../redux/actions/warehouseActions";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UPDATE_DELIVERY_CHALLAN_REQUEST } from "../../redux/actions/deliveryChallanActions";

const DeliveryChallanEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { challans, adding, addError, addSuccess, updating, updateError, updateSuccess } =
    useSelector((state) => state.deliveryChallan);

  // State for managing notifications
  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success', 'error', 'info'
    message: "",
  });

  // Show notification utility
  const showNotification = (type, message, duration = 5000) => {
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

  // Clear notification state on component mount to prevent persistence
  useEffect(() => {
    // Reset local notification state
    setNotification({ show: false, type: "", message: "" });
    
    // Clear Redux states when component mounts or id changes
    dispatch(clearUpdateSuccess());
    dispatch(clearUpdateError());
    dispatch(clearAddSuccess());
    dispatch(clearAddError());

    // Cleanup on unmount
    return () => {
      setNotification({ show: false, type: "", message: "" });
    };
  }, [id, dispatch]); // Re-run when id changes (different challan being edited)

  // Handle success/error notifications and redirect
  useEffect(() => {
    if (updateSuccess && !updating) {
      // Immediately clear error to prevent error message from showing
      dispatch(clearUpdateError());
      showNotification("success", "Delivery Challan updated successfully!");
      // Redirect after showing success message
      const redirectTimer = setTimeout(() => {
        dispatch(clearUpdateSuccess()); // Clear success state before navigating
        navigate("/delivery-challan");
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [updateSuccess, updating, navigate, dispatch]);

  useEffect(() => {
    if (updateError && !updating && !updateSuccess) {
      showNotification("error", `Error: ${updateError}`, 0); // Don't auto-hide error
    }
  }, [updateError, updating, updateSuccess]);

  // Handle add success/error notifications
  useEffect(() => {
    if (addSuccess && !adding) {
      // Immediately clear error to prevent error message from showing
      dispatch(clearAddError());
      showNotification("success", "Delivery Challan added successfully!");
      // Reset form after success
      const resetTimer = setTimeout(() => {
        setFormData({
          party_name: "",
          client_id: "",
          bill_to_address: "",
          gst_no: "",
          ship_to_party_name: "",
          ship_to_address: "",
          payment_terms: "",
          do_date: "",
          do_no: "",
          sales_rep: "",
          party_po_no: "",
          party_po_date: "",
          items: [
            {
              item: "",
              pcs: "",
              qty_mt: "",
              rate: "",
              loading: "",
              eff_rate: "",
              make: "",
              warehouse: "",
              status: "",
            },
          ],
          order_notes: "",
          warehouse_notes: "",
          transport_notes: "",
          freight: "",
          freight_fix_value: "",
          freight_per_ton_value: "",
          courier_options: "",
          mtc: "",
        });
        dispatch(clearAddSuccess()); // Clear success state before navigating
        navigate("/delivery-challan");
      }, 2000);
      return () => clearTimeout(resetTimer);
    }
  }, [addSuccess, adding, navigate, dispatch]);

  useEffect(() => {
    if (addError && !adding && !addSuccess) {
      showNotification("error", `Error adding challan: ${addError}`, 0); // Don't auto-hide error
    }
  }, [addError, adding, addSuccess]);

  const sanitize = (value) => value ?? "";

  const [formData, setFormData] = useState({
    party_name: "",
    client_id: "",
    bill_to_address: "",
    gst_no: "",
    ship_to_party_name: "",
    ship_to_address: "",
    payment_terms: "",
    do_date: "",
    do_no: "",
    sales_rep: "",
    party_po_no: "",
    party_po_date: "",
    items: [
      {
        item: "",
        pcs: "",
        qty_mt: "",
        rate: "",
        loading: "",
        eff_rate: "",
        make: "",
        warehouse: "",
        status: "",
      },
    ],
    order_notes: "",
    warehouse_notes: "",
    transport_notes: "",
    freight: "",
    freight_fix_value: "",
    freight_per_ton_value: "",
    courier_options: "",
    mtc: "",
  });

  // Fields for items (fixed order)
  const itemFields = [
    { label: "Item", key: "item", type: "text" },
    { label: "Pcs", key: "pcs", type: "text" },
    { label: "Qty (MT)", key: "qty_mt", type: "text" },
    { label: "Rate / MT", key: "rate", type: "text" },
    { label: "Loading", key: "loading", type: "text" },
    { label: "Eff. Rate", key: "eff_rate", type: "text" },
    { label: "Make", key: "make", type: "select" },
    { label: "Warehouse", key: "warehouse", type: "select" },
    // { label: "Make", key: "make_id", type: "select" },
    // { label: "Warehouse", key: "warehouse_id", type: "select" },
    { label: "Status", key: "status", type: "status" },
  ];

  // Fetch challans if not already loaded
  useEffect(() => {
    if (id && challans.length === 0) {
      dispatch(fetchChallans());
    }
  }, [id, challans.length, dispatch]);

  // Fetch makes & warehouses for dropdowns
  useEffect(() => {
    dispatch(fetchWarehouses());
    dispatch(fetchMakes());
  }, [dispatch]);

  // Pre-fill form on edit
  useEffect(() => {
    if (id && challans.length > 0) {
      const challanToEdit = challans.find((c) => String(c.id) === String(id));
      if (challanToEdit) {
        setFormData({
          party_name: sanitize(challanToEdit.party_name),
          client_id: sanitize(challanToEdit.client_id),
          bill_to_address: sanitize(challanToEdit.bill_to_address),
          gst_no: sanitize(challanToEdit.gst_no),
          ship_to_party_name: sanitize(challanToEdit.ship_to_party_name),
          ship_to_address: sanitize(challanToEdit.ship_to_address),
          payment_terms: sanitize(challanToEdit.payment_terms),
          do_date: sanitize(challanToEdit.do_date),
          do_no: sanitize(challanToEdit.do_no),
          sales_rep: sanitize(challanToEdit.sales_rep),
          party_po_no: sanitize(challanToEdit.party_po_no),
          party_po_date: sanitize(challanToEdit.party_po_date),
          items:
            challanToEdit.items?.map((item) => ({
              item: sanitize(item.item),
              pcs: sanitize(item.pcs),
              qty_mt: sanitize(item.qty_mt),
              rate: sanitize(item.rate),
              loading: sanitize(item.loading),
              eff_rate: sanitize(item.eff_rate),
              // ✅ FIXED
              make: sanitize(item.make ?? ""),
              warehouse: sanitize(item.warehouse ?? ""),

              // make: sanitize(item.make_id ?? item.make ?? ""),
              // warehouse: sanitize(item.warehouse_id ?? item.warehouse ?? ""),
              // make: sanitize(item.make),
              // warehouse: sanitize(item.warehouse),
              status: sanitize(item.status),
            })) || formData.items,
          order_notes: sanitize(challanToEdit.order_notes),
          warehouse_notes: sanitize(challanToEdit.warehouse_notes),
          transport_notes: sanitize(challanToEdit.transport_notes),
          freight: sanitize(challanToEdit.freight),
          freight_fix_value: sanitize(challanToEdit.freight_fix_value),
          freight_per_ton_value: sanitize(challanToEdit.freight_per_ton_value),
          courier_options: sanitize(challanToEdit.courier_options),
          mtc: sanitize(challanToEdit.mtc),
        });
      }
    }
    console.log("warehouse:", formData.items?.warehouse_id);
    console.log("make:", formData.items?.make_id);
  }, [id, challans]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // selectors for dropdown data
  const makes = useSelector((state) => state.make?.makes || []);
  const warehouses = useSelector((state) => state.warehouse?.warehouses || []);

  // Handle item changes
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // Add new item row
  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item: "",
          pcs: "",
          qty_mt: "",
          rate: "",
          loading: "",
          eff_rate: "",
          make: "",
          warehouse: "",
          status: "",
        },
      ],
    }));
  };

  // Remove item row
  const removeItemRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch({ type: UPDATE_DELIVERY_CHALLAN_REQUEST });
      dispatch(
        updateDeliveryChallan(
          id,
          formData,
          () => {
            // Success callback - notification will be shown via useEffect
          },
          (errorMsg) => {
            // Error callback - notification will be shown via useEffect
            console.error("Update failed:", errorMsg);
          }
        )
      );
    } else {
      dispatch(
        addDeliveryChallan(
          formData,
          () => {
            // Success callback - notification will be shown via useEffect
          },
          (errorMsg) => {
            // Error callback - notification will be shown via useEffect
            console.error("Add failed:", errorMsg);
          }
        )
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Delivery
          Challan
        </p>

        <div className="delivery-challan-top-title-container1">
          <div className="export-addnew-btn0-container-back-btn">
            <Link to="/delivery-challan" className="float-right d-flex">
              Go Back
            </Link>
          </div>
        </div>

        {/* Modal Notification for Success/Error */}
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
                  className={`modal-header border-0 ${"bg-" + (notification.type === "success" ? "success" : notification.type === "error" ? "danger" : "info")} text-white`}
                  style={{ padding: "20px" }}
                >
                  <h5 className="modal-title fw-bold" style={{ fontSize: "18px" }}>
                    {notification.type === "success"
                      ? "✓ Success!"
                      : notification.type === "error"
                        ? "✗ Error!"
                        : "ℹ Info"}
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
                      notification.type === "success"
                        ? "success"
                        : notification.type === "error"
                          ? "danger"
                          : "info"
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

        <form
          className="challan-add-main-right-container py-5"
          onSubmit={handleSubmit}
        >
          {/* ===== Delivery Challan Main Info ===== */}
          <div className="form-section client-info-container">
            <h3>Delivery Challan</h3>
            <div className="row">
              <div className="col-md-6">
                {[
                  { label: "Party Name", name: "party_name" },
                  { label: "Bill To Address", name: "bill_to_address" },
                  { label: "GST No", name: "gst_no" },
                  { label: "Ship To Party Name", name: "ship_to_party_name" },
                  { label: "Ship To Address", name: "ship_to_address" },
                  { label: "Payment Terms", name: "payment_terms" },
                ].map((field, idx) => (
                  <div className="party-name" key={idx}>
                    <label>{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <div className="party-name">
                  <label>D.O. Date</label>
                  <input
                    type="date"
                    name="do_date"
                    value={formData.do_date || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="party-name">
                  <label>D.O. No</label>
                  <input
                    type="text"
                    name="do_no"
                    value={formData.do_no || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="party-name">
                  <label>Sales Rep.</label>
                  <input
                    type="text"
                    name="sales_rep"
                    value={formData.sales_rep || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="party-name">
                  <label>Party P.O. No</label>
                  <input
                    type="text"
                    name="party_po_no"
                    value={formData.party_po_no || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="party-name">
                  <label>Party P.O. No Date</label>
                  <input
                    type="date"
                    name="party_po_date"
                    value={formData.party_po_date || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== Item Information ===== */}
          <div className="form-section client-info-container">
            <h3 className="mb-3">Item Information</h3>
            <div className="row text-muted fw-bold mb-2 border-bottom pb-2 text-start small">
              {itemFields.map((f, i) => (
                <div className="col-1" key={i}>
                  {f.label}
                </div>
              ))}
              <div className="col-1">Actions</div>
            </div>

            {formData.items.map((item, index) => (
              <div
                className="row align-items-center mb-3 text-center"
                key={index}
              >
                {itemFields.map((field, idx) => {
                      // Status dropdown — explicit options
                      if (field.type === "status") {
                        const statuses = [
                          "Pending",
                          "Planning Given",
                          "Ready for dispatch",
                        ];

                        return (
                          <div className="col-1" key={idx}>
                            <select
                              name={field.key}
                              value={item[field.key] || ""}
                              onChange={(e) => handleItemChange(index, e)}
                              className="form-select form-select-sm"
                            >
                              <option value="">Select {field.label}</option>
                              {statuses.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }

                      // Make / Warehouse selects — use redux lists
                      if (field.type === "select") {
                        if (field.key === "make") {
                          return (
                            <div className="col-1" key={idx}>
                              <select
                                name={field.key}
                                value={item[field.key] || ""}
                                onChange={(e) => handleItemChange(index, e)}
                                className="form-select form-select-sm"
                              >
                                <option value="">Select {field.label}</option>
                                {makes.map((m) => (
                                  <option key={m.id} value={m.id}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        }

                        if (field.key === "warehouse") {
                          return (
                            <div className="col-1" key={idx}>
                              <select
                                name={field.key}
                                value={item[field.key] || ""}
                                onChange={(e) => handleItemChange(index, e)}
                                className="form-select form-select-sm"
                              >
                                <option value="">Select {field.label}</option>
                                {warehouses.map((w) => (
                                  <option key={w.id ?? w.warehouse_id} value={w.id ?? w.warehouse_id}>
                                    {w.warehouse_name || w.name || "Unnamed"}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        }
                      }

                      // Default text input
                      return (
                        <div className="col-1" key={idx}>
                          <input
                            type="text"
                            name={field.key}
                            value={item[field.key] || ""}
                            onChange={(e) => handleItemChange(index, e)}
                            className="form-control form-control-sm"
                            placeholder={field.label}
                          />
                        </div>
                      );
                    })}

                <div className="col-1 d-flex justify-content-center gap-1">
                  <button
                    type="button"
                    className="btn btn-sm item-info-btns"
                    onClick={addItemRow}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm item-info-btns"
                    onClick={() => removeItemRow(index)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Notes ===== */}
          <div className="form-section client-info-container">
            <h3>Notes</h3>
            {[
              { label: "Order Notes", name: "order_notes" },
              { label: "Warehouse/Delivery Notes", name: "warehouse_notes" },
              { label: "Transport Notes", name: "transport_notes" },
            ].map((field, idx) => (
              <div className="party-name" key={idx}>
                <label>{field.label}</label>
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* ===== Freight & Courier ===== */}
          <div className="form-section client-info-container">
            <div className="row mb-3 align-items-center">
              <div className="col-sm-2 fw-semibold">Freight</div>
              <div className="col-sm freight-main-container">
                {["toPay", "inclusive", "fix", "perTon"].map((option, idx) => (
                  <div className="freight-option" key={idx}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="freight"
                      value={option}
                      checked={formData.freight === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label ms-1">{option}</label>
                    {option === "fix" && (
                      <input
                        type="text"
                        name="freight_fix_value"
                        value={formData.freight_fix_value || ""}
                        onChange={handleChange}
                        className="form-control ms-2"
                        placeholder="Fix Value"
                      />
                    )}
                    {option === "perTon" && (
                      <input
                        type="text"
                        name="freight_per_ton_value"
                        value={formData.freight_per_ton_value || ""}
                        onChange={handleChange}
                        className="form-control ms-2"
                        placeholder="Per Ton Value"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Courier */}
            <div className="row mb-3 align-items-center border-top pt-3">
              <div className="col-sm-2 fw-semibold">Courier Options</div>
              <div className="col-sm freight-main-container">
                {["N / R", "Invoice Only", "TC+INV", "TC+INV+LR"].map(
                  (opt, idx) => (
                    <div
                      className="form-check form-check-inline freight-option"
                      key={idx}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="courier_options"
                        value={opt}
                        checked={formData.courier_options === opt}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{opt}</label>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* MTC */}
            <div className="row mb-3 align-items-center border-top pt-3">
              <div className="col-sm-2 fw-semibold">MTC</div>
              <div className="col-sm freight-main-container">
                {["N / R", "Only Matching TC", "With Endorsement"].map(
                  (opt, idx) => (
                    <div
                      className="form-check form-check-inline freight-option"
                      key={idx}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="mtc"
                        value={opt}
                        checked={formData.mtc === opt}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{opt}</label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ===== Buttons ===== */}
          <div className="chllan-page-form-btn-container">
            <button
              type="submit"
              className="submit-btn"
              disabled={adding || updating}
            >
              {updating ? "Updating..." : adding ? "Submitting..." : id ? "Update" : "Submit"}
            </button>
            <button type="reset" className="clear-btn">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryChallanEdit;
