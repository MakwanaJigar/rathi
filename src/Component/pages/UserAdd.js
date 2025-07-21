import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetCreateUser } from '../../redux/actions/userActions';

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creating, error, createSuccess } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    access_control: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (createSuccess) {
      setAlert({ type: 'success', text: 'User added successfully!' });

      setTimeout(() => {
        dispatch(resetCreateUser());
        navigate('/user');
      }, 2000);
    }
  }, [createSuccess, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      setAlert({ type: 'danger', text: error });
    }
  }, [error]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAlert(null);
    dispatch(createUser(formData));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      access_control: '',
    });
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

        <div className="challan-add-main-right-container py-5">
          <div className="form-section client-info-container">
            <h3>User</h3>

            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.text}
              </div>
            )}

            <form className="py-3" onSubmit={handleSubmit} onReset={handleReset}>
              <div className="row">
                <div className="col-md-12">
                  <div className="party-name mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder='Enter Your Name'
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="party-name mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder='Enter Your Email'
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="party-name mb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder='Enter Your User Name'
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="party-name mb-3 position-relative">
                    <label>Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder='Enter Your Password...'
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <span
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
                      <option value="none / view / add / edit / delete">
                        None / View / Add / Edit / Delete
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4">
                <button type="submit" className="btn btn-submit px-4" disabled={creating}>
                  {creating ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset" className="btn btn-clear px-4" disabled={creating}>
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
