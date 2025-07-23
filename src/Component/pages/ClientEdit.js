import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, updateClient, fetchClients } from '../../redux/actions/clientActions';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ClientEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // If this exists, we're editing

  const {
    clients,
    adding,
    addError,
    addSuccess,
    updating,
    updateError,
    updateSuccess,
  } = useSelector((state) => state.client);

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

  // Preload client data if editing
  useEffect(() => {
    if (id && clients.length === 0) {
      dispatch(fetchClients());
    }
  }, [id, clients.length, dispatch]);

  useEffect(() => {
    if (id && clients.length > 0) {
      const clientToEdit = clients.find((c) => String(c.id) === String(id));
      if (clientToEdit) {
        setFormData({
          ...clientToEdit,
          billing_address: clientToEdit.billing_address || {
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'India',
          },
          shipping_addresses: clientToEdit.shipping_addresses?.length
            ? clientToEdit.shipping_addresses
            : [
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
      }
    }
  }, [id, clients]);

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
    if (id) {
      dispatch(updateClient(id, formData));
    } else {
      dispatch(addClient(formData));
    }
  };

  // Redirect on success
  useEffect(() => {
    if (addSuccess || updateSuccess) {
      alert(`Client ${id ? 'updated' : 'added'} successfully!`);
      navigate('/client');
    }
  }, [addSuccess, updateSuccess, navigate, id]);

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
              </div>
            ))}
          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-submit px-4" disabled={adding || updating}>
              {id ? 'Update' : 'Submit'}
            </button>
            <button type="reset" className="btn btn-clear px-4">
              Clear
            </button>
          </div>

          {(adding || updating) && <p className="text-info mt-3">Submitting...</p>}
          {(addError || updateError) && <p className="text-danger mt-3">Error: {addError || updateError}</p>}
        </form>
      </div>
    </div>
  );
};

export default ClientEdit;
