import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateWarehouse, fetchWarehouses } from '../../redux/actions/warehouseActions';

const WarehouseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouse = warehouses.find((w) => w.id === parseInt(id) || String(w.id) === id);

  const [formData, setFormData] = useState({ name: '', address: '' });
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const showNotification = (type, message, duration = 0) => {
    setNotification({ show: true, type, message });
    if (duration > 0) {
      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, duration);
    }
  };

  // Fetch warehouses if not loaded
  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehouses());
    }
  }, [dispatch, warehouses.length]);

  // Populate form with existing data
  useEffect(() => {
    if (warehouse) {
      setFormData({
        name: warehouse.warehouse_name || '',
        address: warehouse.warehouse_address || '',
      });
    }
  }, [warehouse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log('✎ FORM CHANGE:', name, '=>', value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      warehouse_name: formData.name.trim(),
      warehouse_address: formData.address.trim(),
    };

    // console.log('=== WAREHOUSE EDIT SUBMIT START ===');
    // console.log('ID from URL:', id);
    // console.log('Current warehouse:', warehouse);
    // console.log('Submitting payload:', payload);
    
    const result = await dispatch(updateWarehouse(id, payload));

    // console.log('=== UPDATE RESULT ===');
    // console.log('Result:', result);
    // console.log('Result.ok:', result.ok);
    // console.log('Result.message:', result.message);

    if (result.ok) {
      console.log('✓ SUCCESS - Showing success notification');
      showNotification('success', result.message, 2000);
      setTimeout(() => {
        console.log('✓ NAVIGATING BACK TO WAREHOUSE LIST');
        navigate('/warehouse');
      }, 2500);
    } else {
      console.log('✗ ERROR - Showing error notification');
      showNotification('error', result.message, 0);
    }

    setSubmitting(false);
  };

  const handleReset = () => {
    if (warehouse) {
      setFormData({
        name: warehouse.warehouse_name || '',
        address: warehouse.warehouse_address || '',
      });
    } else {
      setFormData({ name: '', address: '' });
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master <i className="fa-solid fa-angles-right" /> Warehouse Edit
        </p>

        <div className="delivery-challan-top-title-container">
          <h3 className="main-container-title">Edit Warehouse</h3>
          <div className="export-addnew-btn0-container">
            <Link to="/warehouse">Go Back</Link>
          </div>
        </div>

        <div className="challan-add-main-right-container py-5">
          <div className="form-section client-info-container">
            <h3>Edit Warehouse</h3>

            {warehouse ? (
              <form className="py-3" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="party-name mb-3">
                      <label>Warehouse Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Warehouse Name"
                        required
                      />
                    </div>

                    <div className="party-name mb-3">
                      <label>Warehouse Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Warehouse Address"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <button type="submit" className="btn btn-submit px-4" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update'}
                  </button>
                  <button type="reset" className="btn btn-clear px-4" disabled={submitting}>
                    Clear
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">Loading warehouse data...</div>
            )}
          </div>
        </div>
      </div>

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
                    setNotification({ show: false, type: '', message: '' })
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
                    setNotification({ show: false, type: '', message: '' })
                  }
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseEdit;
