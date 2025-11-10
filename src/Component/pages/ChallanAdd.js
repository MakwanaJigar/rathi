import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchClients } from "../../redux/actions/clientActions";
import { fetchSalesReps } from "../../redux/actions/representativeActions";
import { fetchMakes } from "../../redux/actions/makeActions";
import { fetchWarehouses } from "../../redux/actions/warehouseActions";

import {
  addDeliveryChallan,
  getNextDONumber,
} from "../../redux/actions/deliveryChallanActions";

const ChallanAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adding, addError, addSuccess } = useSelector(
    (state) => state.deliveryChallan
  );

  const [message, setMessage] = useState(""); // store success or error message
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const [formData, setFormData] = useState({
    party_name: "",
    bill_to_address: "",
    gst_no: "",
    ship_to_party_name: "",
    ship_to_address: "",
    payment_terms: "",
    do_date: "",
    sales_rep: "", // Stores the NAME of the sales rep
    sales_rep_id: "", // Stores the ID of the sales rep (used as the select value)
    do_no: "",
    client_id: "",
    date: "",
    items: [
      {
        item: "",
        make: "",
        pcs: "",
        qty_mt: "",
        rate_mt: "",
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
    courier_options: "",
    mtc: "",
    party_po_no: "",
    party_po_date: "",
  });

  // Selectors
  const makes = useSelector((state) => state.make?.makes || []);
  const warehouses = useSelector((state) => state.warehouse?.warehouses || []);
  const clients = useSelector((state) => state.client.clients);
  const representatives = useSelector(
    (state) => state.salesRep.representatives
  );
  const challans = useSelector((state) => state.deliveryChallan.challans);

  // Handle field changes
  const handleChange = (e, section, index) => {
    const { name, value, options, selectedIndex } = e.target;

    if (section === "items") {
      const updatedItems = [...formData.items];
      updatedItems[index][name] = value;
      setFormData({ ...formData, items: updatedItems });
    } else if (name === "sales_rep") {
      // ⭐ START: CORRECTED LOGIC FOR SALES REP DROPDOWN ⭐
      const selectedRepId = value; // The 'value' from the option is the ID
      const selectedRep = representatives.find(
        (rep) => rep.id.toString() === selectedRepId
      );

      setFormData({
        ...formData,
        sales_rep: selectedRep ? selectedRep.name : "", // Store the name
        sales_rep_id: selectedRepId, // Store the ID
      });
      // ⭐ END: CORRECTED LOGIC FOR SALES REP DROPDOWN ⭐
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Add or delete items dynamically
  const addItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index + 1, 0, {
      item: "",
      make: "",
      pcs: "",
      qty_mt: "",
      rate_mt: "",
      loading: "",
      eff_rate: "",
      warehouse: "",
      status: "",
    });
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const deleteItem = (index) => {
    const newItems = [...formData.items];
    if (newItems.length > 1) {
      newItems.splice(index, 1);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  // DATE FORMAT
  const formatDate = (date) => {
    if (!date) return null; // send null if empty
    const d = new Date(date);
    if (isNaN(d)) return null; // safeguard invalid date
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      party_name: formData.party_name || "",
      bill_to_address: formData.bill_to_address || "",
      gst_no: formData.gst_no || "",
      ship_to_party_name: formData.ship_to_party_name || "",
      ship_to_address: formData.ship_to_address || "",
      payment_terms: formData.payment_terms || "",
      do_date: formatDate(formData.do_date),
      do_no: formData.do_no || "",
      client_id: formData.client_id ? Number(formData.client_id) : null,
      order_notes: formData.order_notes || "",
      warehouse_notes: formData.warehouse_notes || "",
      transport_notes: formData.transport_notes || "",
      freight: formData.freight || "",
      courier_options: formData.courier_options || "",
      mtc: formData.mtc || "",
      party_po_no: formData.party_po_no || "",
      party_po_date: formatDate(formData.party_po_date),
      sales_rep: formData.sales_rep || "", // The name is used here
      // Consider sending sales_rep_id if the API requires the ID instead of the name
      // sales_rep_id: formData.sales_rep_id ? Number(formData.sales_rep_id) : null,
      items: formData.items.map((item) => ({
        item: item.item || "",
        make: item.make || "",
        pcs: item.pcs ? Number(item.pcs) : null,
        qty_mt: item.qty_mt ? Number(item.qty_mt) : null,
        rate_mt: item.rate_mt ? Number(item.rate_mt) : null,
        loading: item.loading || "",
        eff_rate: item.eff_rate || "",
        warehouse: item.warehouse || "",
        status: item.status || "",
      })),
    };

    console.log("✅ Submitting Delivery Challan Payload:", payload);

    const response = await dispatch(addDeliveryChallan(payload));
    console.log("✅ Delivery Challan API Response:", response);

    if (response.success || response.message.includes("created successfully")) {
      setMessage("Delivery Challan submitted successfully!");
      setMessageType("success");
      setTimeout(() => navigate("/delivery-challan"), 1500);
    } else {
      setMessage(response.message || "Form submission failed");
      setMessageType("error");
    }
  };

  // Redirect on success
  useEffect(() => {
    if (addSuccess) {
      alert("Delivery Challan added successfully!");
      navigate("/delivery-challan");
    }
  }, [addSuccess, navigate]);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchWarehouses());
    dispatch(fetchMakes());
    dispatch(fetchSalesReps());
    dispatch(fetchClients());
  }, [dispatch]);

  const [shipToAddressList, setShipToAddressList] = useState([]);

  // .....INPUT FIELDS STATES.....
  const [gstNo, setGstNo] = useState("");
  const [dONumber, setDoNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handlePartyChange = (e) => {
    const selectedId = e.target.value;
    const client = clients.find((c) => c.id === parseInt(selectedId));

    if (client) {
      // Bill To
      const billing = client.billing_address || {};
      const billToFullAddress = [
        billing.address_line1,
        billing.address_line2,
        billing.city,
        billing.state,
        billing.postal_code,
        billing.country,
      ]
        .filter(Boolean)
        .join(", ");

      // Ship To
      const shippingAddresses = Array.isArray(client.shipping_addresses)
        ? client.shipping_addresses
        : [];

      setShipToAddressList(shippingAddresses); // <-- dropdown ke liye list update

      // Default Ship To Address (pehla)
      let firstShipTo = "";
      if (shippingAddresses.length > 0) {
        const first = shippingAddresses[0];
        firstShipTo = [
          first.address_line1,
          first.address_line2,
          first.city,
          first.state,
          first.postal_code,
          first.country,
        ]
          .filter(Boolean)
          .join(", ");
      }

      // Update formData
      setFormData((prev) => ({
        ...prev,
        client_id: selectedId,
        party_name: client.company_name || "",
        gst_no: client.gst_no || "",
        bill_to_address: billToFullAddress,
        ship_to_party_name: client.company_name || "",
        ship_to_address: firstShipTo,
      }));
    } else {
      // Reset if no client selected
      setShipToAddressList([]);
      setFormData((prev) => ({
        ...prev,
        client_id: "",
        party_name: "",
        gst_no: "",
        bill_to_address: "",
        ship_to_party_name: "",
        ship_to_address: "",
      }));
    }
  };

  // add challan
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // GST FORMAT

  const [isValidGST, setIsValidGST] = useState(true);

  const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}Z[0-9]{1}$/;

  const handleGstChange = (e) => {
    const input = e.target.value.toUpperCase();

    // Allow only alphanumeric and max 15 characters
    if (/^[0-9A-Z]*$/.test(input) && input.length <= 15) {
      setGstNo(input);

      // Validate format only if 15 characters
      if (input.length === 15) {
        setIsValidGST(GST_REGEX.test(input));
      } else {
        setIsValidGST(true); // not enough characters yet
      }
    }
  };

  // D.O.NUMBER
  const [manualEntry, setManualEntry] = useState(false);

  // Auto-generate D.O. No (you can replace this with your logic)
  const getNextDONumberLogic = (challans) => {
    if (!challans || challans.length === 0) {
      return "RI-01"; // First challan
    }

    // Extract numbers from D.O. No like RI-01
    const lastChallan = challans[challans.length - 1];
    const lastNumberStr = lastChallan.do_no?.split("-")[1] || "0";
    const lastNumber = parseInt(lastNumberStr, 10) || 0;

    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `RI-${nextNumber}`;
  };

  useEffect(() => {
    if (!manualEntry) {
      const nextDO = getNextDONumberLogic(challans); // Use local logic or Redux logic
      setDoNumber(nextDO);
      setFormData((prev) => ({ ...prev, do_no: nextDO }));
    }
  }, [challans, manualEntry]);

  const handleDoNumberChange = (e) => {
    const value = e.target.value;
    setDoNumber(value);
    setFormData((prev) => ({ ...prev, do_no: value }));
  };

  return (
    <>
      <div className="container-fluid">
        <div className=" main-content">
          <p className="main-container-title">
            Dashboard <i className="fa-solid fa-angles-right"></i> Delivery
            Challan <i className="fa-solid fa-angles-right"></i> Edit
          </p>
          <div className="delivery-challan-top-title-container ">
            <h3 className="main-container-title">Delivery Challan</h3>
            <div className="export-addnew-btn0-container">
              {/* <a href=""><i className="fa-solid fa-download"></i> Export Now</a> */}
              <Link to="/delivery-challan">Go Back</Link>
            </div>
          </div>

          {/* MAIN DATA */}
          {message && (
            <div
              style={{
                backgroundColor:
                  messageType === "success" ? "#d1e7dd" : "#f8d7da",
                color: messageType === "success" ? "#0f5132" : "#842029",
                border: `1px solid ${
                  messageType === "success" ? "#badbcc" : "#f5c2c7"
                }`,
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              {message}
            </div>
          )}
          <form
            className="challan-add-main-right-container py-5"
            onSubmit={handleSubmit}
          >
            <div className="form-section client-info-container client-info-container">
              <h3 className="">Delivery Challan</h3>
              <div className="py-3">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="party-name">
                      <label>Party Name</label>
                      <select
                        className="delivery-challan-dropdown-field"
                        name="client_id"
                        value={formData.client_id}
                        onChange={handlePartyChange}
                      >
                        <option value="">Select Party Name</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.company_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="party-name">
                      <label>Bill To Address</label>
                      <input
                        type="text"
                        name="bill_to_address"
                        placeholder="Enter Your Bill To Address"
                        value={formData.bill_to_address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="party-name">
                      <label>GST No</label>
                      <input
                        type="text"
                        placeholder="Enter Your GST No"
                        name="gst_no"
                        value={formData.gst_no}
                        onChange={handleChange}
                        style={{
                          borderColor: gstNo && !isValidGST ? "red" : "#ccc",
                        }}
                      />
                      {!isValidGST && (
                        <small style={{ color: "red" }}>
                          Invalid GST number format
                        </small>
                      )}
                    </div>
                    <div className="party-name">
                      <label>Ship To Party Name</label>
                      <input
                        type="text"
                        placeholder="Enter Your Ship To Party Name"
                        name="ship_to_party_name"
                        value={formData.ship_to_party_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="party-name">
                      <label>Ship To Address</label>
                      <select
                        className="delivery-challan-dropdown-field"
                        name="ship_to_address"
                        value={formData.ship_to_address}
                        onChange={handleChange}
                      >
                        {shipToAddressList.length === 0 && (
                          <option value="">No shipping addresses</option>
                        )}

                        {shipToAddressList.map((address, index) => {
                          const fullAddress = [
                            address.address_line1,
                            address.address_line2,
                            address.city,
                            address.state,
                            address.postal_code,
                            address.country,
                          ]
                            .filter(Boolean)
                            .join(", ");

                          return (
                            <option key={index} value={fullAddress}>
                              {fullAddress}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="party-name">
                      <label>Payment Terms</label>
                      <div className="delivery-chall-payment-check-box">
                        {/* Payment input field (disabled when checkbox is checked) */}
                        <input
                          type="text"
                          placeholder="Enter Your Payment Terms"
                          name="payment_terms"
                          value={formData.payment_terms}
                          onChange={handleChange}
                          className="form-control"
                          disabled={isChecked}
                        />

                        {/* Checkbox */}
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="termsCheckbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            style={{
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="termsCheckbox"
                            style={{ margin: 0, cursor: "pointer" }}
                          >
                            Advance
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="party-name">
                      <label> D.O. Date</label>
                      <input
                        type="date"
                        placeholder="Enter Your D.O. Date"
                        name="do_date"
                        value={formData.do_date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="party-name">
                      <label>D.O. No</label>
                      <div className="delivery-chall-payment-check-box">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="D.O. Number"
                          value={dONumber}
                          onChange={handleDoNumberChange}
                          disabled={!manualEntry} // disable typing if not manual
                        />

                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="manualEntry"
                            checked={manualEntry}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setManualEntry(checked);
                              if (!checked) {
                                const nextDO = getNextDONumberLogic(challans);
                                setDoNumber(nextDO);
                                setFormData((prev) => ({
                                  ...prev,
                                  do_no: nextDO,
                                }));
                              }
                            }}
                            style={{
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="manualEntry"
                            style={{ margin: 0, cursor: "pointer" }}
                          >
                            Type
                          </label>
                        </div>
                      </div>
                    </div>


                    <div className="party-name">
                      <label>Sales Rep.</label>
                      <select
                        name="sales_rep"
                        // ⭐ START: BINDING CHANGE ⭐
                        // Bind the select value to the ID field in formData
                        value={formData.sales_rep_id} 
                        // ⭐ END: BINDING CHANGE ⭐
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select Sales Rep</option>
                        {representatives.map((rep) => (
                          <option key={rep.id} value={rep.id}>
                            {rep.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="party-name">
                      <label>Party P.O. No</label>
                      <input
                        type="text"
                        placeholder="Enter Your P.O. No"
                        name="party_po_no"
                        value={formData.party_po_no}
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
            </div>

            <div className="form-section client-info-container">
              <h3 className="mb-3">Item Information</h3>

              {/* Column Labels */}
              <div className="row text-muted fw-bold mb-2 border-bottom pb-2 text-center small">
                <div className="col-1">No.</div>
                <div className="col-1">Item</div>
                <div className="col-1">Make</div>
                <div className="col-1">Pcs</div>
                <div className="col-1 text-nowrap">Qty (MT)</div>
                <div className="col-1 text-nowrap">Rate / MT</div>
                <div className="col-1">Loading</div>
                <div className="col-1 text-nowrap">Eff. Rate</div>
                <div className="col-1">Warehouse</div>
                <div className="col-1">Status</div>
                <div className="col-1">Actions</div>
              </div>

              {/* Row 1 */}
              {formData.items.map((item, index) => (
                <div
                  className="row align-items-center mb-3 text-center"
                  key={index}
                >
                  <div className="col-1 fw-semibold">
                    {String(index + 1).padStart(2, "0")}.
                  </div>

                  {/* Item Name */}
                  <div className="col-1">
                    <input
                      type="text"
                      name="item"
                      placeholder="item"
                      value={formData.items[index].item}
                      onChange={(e) => handleChange(e, "items", index)}
                      className="form-control"
                    />
                  </div>

                  {/* Make Dropdown */}
                  <div className="col-1">
                    <select
                      className="form-select form-select-sm"
                      name="make"
                      value={item.make || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    >
                      <option value="">Make</option>
                      {makes.map((make) => (
                        <option key={make.id} value={make.id}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pcs */}
                  <div className="col-1">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Pcs"
                      name="pcs"
                      value={item.pcs || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    />
                  </div>

                  {/* Qty */}
                  <div className="col-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Qty"
                      name="qty_mt"
                      value={item.qty_mt || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    />
                  </div>

                  {/* Rate */}
                  <div className="col-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Rate"
                      name="rate_mt"
                      value={item.rate_mt || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    />
                  </div>

                  {/* Loading */}
                  <div className="col-1">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Loading"
                      name="loading"
                      value={item.loading || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    />
                  </div>

                  {/* Eff. Rate */}
                  <div className="col-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Eff. Rate"
                      name="eff_rate"
                      value={item.eff_rate || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                      disabled
                    />
                  </div>

                  {/* Warehouse Dropdown */}
                  <div className="col-1">
                    <select
                      className="form-select form-select-sm"
                      name="warehouse"
                      value={item.warehouse || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.warehouse_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Dropdown */}
                  <div className="col-1">
                    <select
                      className="form-select form-select-sm"
                      name="status"
                      value={item.status || ""}
                      onChange={(e) => handleChange(e, "items", index)}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Planning Given">Planning Given</option>
                      <option value="Ready for dispatch">Ready for dispatch</option>
                    </select>
                  </div>

                  {/* Add/Delete Buttons */}
                  <div className="col-1 d-flex justify-content-center gap-1">
                    <button
                      type="button"
                      className="btn btn-sm item-info-btns"
                      onClick={() => addItem(index)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm item-info-btns"
                      onClick={() => deleteItem(index)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-section client-info-container client-info-container">
              <h3 className="">Notes</h3>
              <div className="py-3">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="party-name">
                      <label>Order Notes</label>
                      <textarea
                        type="text"
                        placeholder="Enter Your Order Note"
                        name="order_notes"
                        value={formData.order_notes}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="party-name">
                      <label> Warehouse/Delivery Notes</label>
                      <textarea
                        type="text"
                        placeholder="Enter Warehouse/Delivery Notes"
                        name="warehouse_notes"
                        value={formData.warehouse_notes}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="party-name">
                      <label> Transport Notes</label>
                      <textarea
                        type="text"
                        placeholder="Enter Your Transport Notes"
                        name="transport_notes"
                        value={formData.transport_notes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section client-info-container client-info-container">
              {/* <h3 className=''>Notes</h3> */}
              <div className="row mb-3 align-items-center">
                <div className="col-sm-2 fw-semibold">Freight</div>
                <div className="col-sm freight-main-container">
                  {/* To Pay */}
                  <div className="freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="freight"
                      id="freightToPay"
                      value="toPay"
                      checked={formData.freight === "toPay"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label ms-1"
                      htmlFor="freightToPay"
                    >
                      To Pay
                    </label>
                  </div>

                  {/* Inclusive */}
                  <div className="freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="freight"
                      id="freightInclusive"
                      value="inclusive"
                      checked={formData.freight === "inclusive"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label ms-1"
                      htmlFor="freightInclusive"
                    >
                      Inclusive
                    </label>
                  </div>

                  {/* Fix */}
                  <div className="freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="freight"
                      id="freightFix"
                      value="fix"
                      checked={formData.freight === "fix"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label ms-1"
                      htmlFor="freightFix"
                    >
                      Fix
                    </label>
                    {formData.freight === "fix" && (
                      <input
                        type="text"
                        name="freight_fix_value"
                        value={formData.freight_fix_value || ""}
                        onChange={handleChange}
                        className="form-control ms-2"
                        style={{ width: "100px" }}
                        placeholder="Fix Value"
                      />
                    )}
                  </div>

                  {/* Per TON */}
                  <div className="freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="freight"
                      id="freightPerTon"
                      value="perTon"
                      checked={formData.freight === "perTon"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label ms-1"
                      htmlFor="freightPerTon"
                    >
                      Per TON
                    </label>
                    {formData.freight === "perTon" && (
                      <input
                        type="text"
                        name="freight_per_ton_value"
                        value={formData.freight_per_ton_value || ""}
                        onChange={handleChange}
                        className="form-control ms-2"
                        style={{ width: "100px" }}
                        placeholder="Per Ton Value"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* */}
              <div className="row mb-3 align-items-center border-top pt-3">
                <div className="col-sm-2 fw-semibold">Courier Options</div>
                <div className="col-sm freight-main-container">
                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courier_options"
                      id="courierNR"
                      value="N / R"
                      checked={formData.courier_options === "N / R"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="courierNR">
                      N / R
                    </label>
                  </div>

                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courier_options"
                      id="courierInvoice"
                      value="Invoice Only"
                      checked={formData.courier_options === "Invoice Only"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="courierInvoice"
                    >
                      Invoice Only
                    </label>
                  </div>

                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courier_options"
                      id="courierTCINV"
                      value="TC+INV"
                      checked={formData.courier_options === "TC+INV"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="courierTCINV">
                      TC+INV
                    </label>
                  </div>

                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courier_options"
                      id="courierAll"
                      value="TC+INV+LR"
                      checked={formData.courier_options === "TC+INV+LR"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="courierAll">
                      TC+INV+LR
                    </label>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="row mb-3 align-items-center border-top pt-3">
                <div className="col-sm-2 fw-semibold">MTC</div>
                <div className="col-sm freight-main-container">
                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mtc"
                      id="mtcNR"
                      value="N / R"
                      checked={formData.mtc === "N / R"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mtcNR">
                      N / R
                    </label>
                  </div>
                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mtc"
                      id="mtcMatchTC"
                      value="Only Matching TC"
                      checked={formData.mtc === "Only Matching TC"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mtcMatchTC">
                      Only Matching TC
                    </label>
                  </div>
                  <div className="form-check form-check-inline freight-option">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mtc"
                      id="mtcEndorsement"
                      value="With Endorsement"
                      checked={formData.mtc === "With Endorsement"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="mtcEndorsement"
                    >
                      With Endorsement
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="chllan-page-form-btn-container">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading || adding ? "Submitting…" : "Submit"}
              </button>
              <button type="reset" className="clear-btn">
                Clear
              </button>
            </div>
            {adding && <p className="text-info mt-3">Submitting...</p>}
            {/* {addError && <p className="text-danger mt-3">Error: {addError}</p>} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChallanAdd;