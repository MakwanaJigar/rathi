import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateWarehouse, fetchWarehouses } from '../../redux/actions/warehouseActions';

const WarehouseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouse = warehouses.find((w) => w.id === parseInt(id));

  const [formData, setFormData] = useState({ name: '', address: '' });
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

  const payload = {
  warehouse_name: formData.name.trim(),
  warehouse_address: formData.address.trim(),
};


    const result = await dispatch(updateWarehouse(id, payload));

    if (result.ok) {
      setAlert({ type: 'success', text: result.message });
      setTimeout(() => navigate('/warehouse'), 1500);
    } else {
      setAlert({ type: 'danger', text: result.message });
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
    setAlert(null);
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

            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
              </div>
            )}

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
    </div>
  );
};

export default WarehouseEdit;
