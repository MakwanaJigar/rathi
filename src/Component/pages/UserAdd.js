import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserAdd = () => {
  const navigate = useNavigate();

  // -------- form state --------
  const [formData, setFormData] = useState({
    name: '',
    email: '',       
    username: '',
    password: '',
    access_control: '',
  });

  // -------- ui helpers --------
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);   
  const [submitting, setSubmitting] = useState(false);

  // -------- handlers --------
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    try {
      const res = await fetch(
        'https://replete-software.com/projects/rathi/api/add-user',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (res.ok && data?.status === 'success') {
        setAlert({ type: 'success', text: data.message || 'User added successfully!' });
        setTimeout(() => navigate('/user'), 2000);
      } else {
        const msg = data?.message || 'Something went wrong, please try again.';
        setAlert({ type: 'danger', text: msg });
      }
    } catch (err) {
      setAlert({ type: 'danger', text: err.message || 'Network error, please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', username: '', password: '', access_control: '' });
    setAlert(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{' '}
          <i className="fa-solid fa-angles-right" /> User Add
        </p>

        <div className="delivery-challan-top-title-container container">
          <h3 className="main-container-title">User</h3>
          <div className="export-addnew-btn0-container">
            <Link to="/user">Go Back</Link>
          </div>
        </div>

        {/* MAIN DATA */}
        <div className="challan-add-main-right-container py-5">
          <div className="form-section client-info-container">
            <h3>User</h3>

            {/* alerts */}
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
              </div>
            )}

            <form className="py-3" onSubmit={handleSubmit} onReset={handleReset}>
              <div className="row">
                <div className="col-md-12">
                  {/* Name */}
                  <div className="party-name mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="party-name mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}          
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your Email Address"
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="party-name mb-3">
                    <label>User Name</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your User Name"
                      required
                    />
                  </div>

                  {/* Password with eye toggle */}
                  <div className="party-name mb-3 position-relative">
                    <label>Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="*********"
                      required
                    />
                    <span
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#888',
                      }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </span>
                  </div>

                  {/* Access control */}
                  <div className="party-name mb-3">
                    <label>Access Control</label>
                    <select
                      name="access_control"
                      value={formData.access_control}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">None</option>
                      <option value="none / view">None / View</option>
                      <option value="none / view / add">None / View / Add</option>
                      <option value="none / view / add / edit">None / View / Add / Edit</option>
                      <option value="none / view / add / edit / delete">None / View / Add / Edit / Delete</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className="d-flex gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-submit px-4"
                  disabled={submitting}
                >
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

export default UserAdd;
