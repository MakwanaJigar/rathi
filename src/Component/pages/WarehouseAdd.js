import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addWarehouse } from '../../redux/actions/warehouseActions';

const WarehouseAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setAlert(null);

  const payload = {
    warehouse_name: formData.name,
    warehouse_address: formData.address,
  };

  const result = await dispatch(addWarehouse(payload));
  console.log('result', result);
  if (result.ok) {
    setAlert({ type: 'success', text: result.message });
    setTimeout(() => navigate('/warehouse'), 2000);
  } else {
    setAlert({ type: 'danger', text: result.message });
  }
  setSubmitting(false);
};

  const handleReset = () => {
    setFormData({ name: '', address: '' });
    setAlert(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master <i className="fa-solid fa-angles-right" /> Warehouse Add
        </p>

        <div className="delivery-challan-top-title-container">
          <h3 className="main-container-title">Warehouse Add</h3>
          <div className="export-addnew-btn0-container">
            <Link to="/warehouse">Go Back</Link>
          </div>
        </div>

        <div className="challan-add-main-right-container py-5">
          <div className="form-section client-info-container">
            <h3>Add Warehouse</h3>

            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
              </div>
            )}

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
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset" className="btn btn-clear px-4" disabled={submitting}>
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

export default WarehouseAdd;
