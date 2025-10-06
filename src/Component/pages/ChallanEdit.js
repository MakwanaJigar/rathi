import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliveryChallan,
  updateDeliveryChallan,
  fetchChallans,
} from "../../redux/actions/deliveryChallanActions";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UPDATE_DELIVERY_CHALLAN_REQUEST } from "../../redux/actions/deliveryChallanActions";

const DeliveryChallanEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { challans, adding, addError, updating, updateError, updateSuccess } =
    useSelector((state) => state.deliveryChallan);

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
        make: "",
        pcs: "",
        qty: "",
        rate: "",
        loading: "",
        eff_rate: "",
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
    { label: "Make", key: "make", type: "select" },
    { label: "Pcs", key: "pcs", type: "text" },
    { label: "Qty (MT)", key: "qty_mt", type: "text" },
    { label: "Rate / MT", key: "rate", type: "text" },
    { label: "Loading", key: "loading", type: "text" },
    { label: "Eff. Rate", key: "eff_rate", type: "text" },
    { label: "Warehouse", key: "warehouse", type: "select" },
    { label: "Status", key: "status", type: "status" },
  ];

  // Fetch challans if not already loaded
  useEffect(() => {
    if (id && challans.length === 0) {
      dispatch(fetchChallans());
    }
  }, [id, challans.length, dispatch]);

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
              make: sanitize(item.make),
              pcs: sanitize(item.pcs),
              qty_mt: sanitize(item.qty_mt),
              rate: sanitize(item.rate),
              loading: sanitize(item.loading),
              eff_rate: sanitize(item.eff_rate),
              warehouse: sanitize(item.warehouse),
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
  }, [id, challans]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          make: "",
          pcs: "",
          qty_mt: "",
          rate: "",
          loading: "",
          eff_rate: "",
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
        updateDeliveryChallan(id, formData, () => {
          alert("Delivery Challan updated successfully!");
          navigate("/delivery-challan");
        })
      );
    } else {
      dispatch(addDeliveryChallan(formData));
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
                  if (field.type === "status") {
                    return (
                      <div className="col-2" key={idx}>
                        <select
                          name={field.key}
                          value={item[field.key]}
                          onChange={(e) => handleItemChange(index, e)}
                          className="form-select form-select-sm"
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Planning Given">Planning Given</option>
                          <option value="Ready for dispatch">
                            Ready for dispatch
                          </option>
                        </select>
                      </div>
                    );
                  } else if (field.type === "select") {
                    return (
                      <div className="col-1" key={idx}>
                        <select
                          name={field.key}
                          value={item[field.key]}
                          onChange={(e) => handleItemChange(index, e)}
                          className="form-select form-select-sm"
                        >
                          <option value="">Select {field.label}</option>
                        </select>
                      </div>
                    );
                  } else {
                    return (
                      <div className="col-1" key={idx}>
                        <input
                          type="text"
                          name={field.key}
                          value={item[field.key]}
                          onChange={(e) => handleItemChange(index, e)}
                          className="form-control form-control-sm"
                          placeholder={field.label}
                        />
                      </div>
                    );
                  }
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
                  )
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
                  )
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
              {id ? "Update" : "Submit"}
            </button>
            <button type="reset" className="clear-btn">
              Clear
            </button>
          </div>

          {updateError && !updateSuccess && (
            <p className="text-danger mt-3">Error: {updateError}</p>
          )}

          {(adding || updating) && (
            <p className="text-info mt-3">Submitting...</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeliveryChallanEdit;
