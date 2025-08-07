import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClient } from '../../redux/actions/clientActions';
import { useNavigate, Link } from 'react-router-dom';

const ClientAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adding, addError, addSuccess } = useSelector((state) => state.client);

  const [formData, setFormData] = useState({
    company_name: '',
    client_personal_name: '',
    phone: '',
    email: '',
    gst_no: '',
    billing_address: {
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
    },
    shipping_addresses: [
      {
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
      },
    ],
  });

  const handleChange = (e, section = null, index = null) => {
    const { name, value } = e.target;

    if (section === 'billing_address') {
      setFormData((prev) => ({
        ...prev,
        billing_address: {
          ...prev.billing_address,
          [name]: value,
        },
      }));
    } else if (section === 'shipping_addresses') {
      const updatedAddresses = [...formData.shipping_addresses];
      updatedAddresses[index][name] = value;
      setFormData((prev) => ({
        ...prev,
        shipping_addresses: updatedAddresses,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClient(formData));
  };

  // Redirect and alert on success
  useEffect(() => {
    if (addSuccess) {
      alert('Client added successfully!');
      navigate('/client');
    }
  }, [addSuccess, navigate]);



  // add and dlt addresses
  const addAddress = (index) => {
    const newAddresses = [...formData.shipping_addresses];
    // Duplicate the current address at 'index'
    newAddresses.splice(index + 1, 0, { ...newAddresses[index] });
    setFormData({ ...formData, shipping_addresses: newAddresses });
  };

  const deleteAddress = (index) => {
    const newAddresses = [...formData.shipping_addresses];
    if (newAddresses.length > 1) { // prevent deleting all addresses
      newAddresses.splice(index, 1);
      setFormData({ ...formData, shipping_addresses: newAddresses });
    }
  };


  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Master{' '}
          <i className="fa-solid fa-angles-right"></i> Client
        </p>

        <div className="delivery-challan-top-title-container1">
          <div className="export-addnew-btn0-container-back-btn">
            <Link to="/client" className="float-right d-flex">
              Go Back
            </Link>
          </div>
        </div>

        <form className="challan-add-main-right-container py-5" onSubmit={handleSubmit}>
          <div className="border p-4 rounded client-add-box">
            <h4 className="fw-bold mb-4 pb-2 border-bottom">Client</h4>

            <div className="row">
              <div className="col-md-6 pe-md-5">
                <div className="mb-3">
                  <label>Company Name</label>
                  <input name="company_name" value={formData.company_name} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>GST No.</label>
                  <input name="gst_no" value={formData.gst_no} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="col-md-6 ps-md-5 border-start">
                <div className="mb-3">
                  <label>Client Personal Name</label>
                  <input name="client_personal_name" value={formData.client_personal_name} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded client-add-box">
            <h4 className="fw-bold mb-4 pb-2 border-bottom">Billing Address</h4>

            <div className="row">
              <div className="col-md-6 pe-md-5">
                <div className="mb-3">
                  <label>Address 1</label>
                  <input name="address_line1" value={formData.billing_address.address_line1} onChange={(e) => handleChange(e, 'billing_address')} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>City</label>
                  <input name="city" value={formData.billing_address.city} onChange={(e) => handleChange(e, 'billing_address')} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Postal Code</label>
                  <input name="postal_code" value={formData.billing_address.postal_code} onChange={(e) => handleChange(e, 'billing_address')} className="form-control" />
                </div>
              </div>

              <div className="col-md-6 ps-md-5 border-start">
                <div className="mb-3">
                  <label>Address 2</label>
                  <input name="address_line2" value={formData.billing_address.address_line2} onChange={(e) => handleChange(e, 'billing_address')} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>State</label>
                  <input name="state" value={formData.billing_address.state} onChange={(e) => handleChange(e, 'billing_address')} className="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded client-add-box">
            <h4 className="fw-bold mb-3 pb-2 border-bottom">Shipping Address</h4>

            {formData.shipping_addresses.map((address, index) => (
              <div className="row mb-3" key={index}>
                {/* Existing input fields */}
                <div className="col-md-2">
                  <input
                    name="address_line1"
                    value={address.address_line1}
                    onChange={(e) => handleChange(e, 'shipping_addresses', index)}
                    className="form-control"
                    placeholder="Address 1"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    name="address_line2"
                    value={address.address_line2}
                    onChange={(e) => handleChange(e, 'shipping_addresses', index)}
                    className="form-control"
                    placeholder="Address 2"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    name="city"
                    value={address.city}
                    onChange={(e) => handleChange(e, 'shipping_addresses', index)}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    name="state"
                    value={address.state}
                    onChange={(e) => handleChange(e, 'shipping_addresses', index)}
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    name="postal_code"
                    value={address.postal_code}
                    onChange={(e) => handleChange(e, 'shipping_addresses', index)}
                    className="form-control"
                    placeholder="Postal Code"
                  />
                </div>
                {/* Buttons for add/delete */}
                <div className="col-md-2 d-flex align-items-center">
                  <button
                    type="button"
                    onClick={() => addAddress(index)}
                    className="client-address-dlt-btn"
                    title="Add address"
                  >
                    <i className="fas fa-plus" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAddress(index)}
                    className="client-address-dlt-btn"
                    title="Delete address"
                    disabled={formData.shipping_addresses.length === 1} 
                  >
                    <i className="fas fa-trash"/>
                  </button>
                </div>
              </div>
            ))}

          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-submit px-4" disabled={adding}>
              Submit
            </button>
            <button type="reset" className="btn btn-clear px-4">
              Clear
            </button>
          </div>

          {adding && <p className="text-info mt-3">Submitting...</p>}
          {addError && <p className="text-danger mt-3">Error: {addError}</p>}
        </form>
      </div>
    </div>
  );
};

export default ClientAdd;
