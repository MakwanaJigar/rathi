import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateUser, resetUpdateUser } from "../../redux/actions/userActions";

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // User data passed from previous page
  const userData = location.state?.userData;

  // Redux state
  const { updating, updateSuccess, updateError } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    // password will not be editable or shown
    access_control: "",
  });

  const [alert, setAlert] = useState(null);

  // Reset update state when component mounts, so no stale success message
  useEffect(() => {
    dispatch(resetUpdateUser());
    setAlert(null);
  }, [dispatch]);

  // Pre-fill form when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        username: userData.username || "",
        access_control: userData.access_control || "",
      });
    }
  }, [userData]);

  // Show success message only when updateSuccess changes to true (after submit)
  useEffect(() => {
    if (updateSuccess) {
      setAlert({ type: "success", text: "User updated successfully!" });
      // Redirect after 2 seconds
      const timer = setTimeout(() => {
        navigate("/user");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [updateSuccess, navigate]);

  // Show error if update fails
  useEffect(() => {
    if (updateError) {
      setAlert({ type: "danger", text: updateError });
    }
  }, [updateError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null);

    // Since password is not editable, do not send it in update payload
    dispatch(updateUser(userData.id, formData));
  };

  const handleReset = () => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        username: userData.username || "",
        access_control: userData.access_control || "",
      });
    }
    setAlert(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> User Edit
        </p>

        <div className="delivery-challan-top-title-container container">
          <h3 className="main-container-title">Edit User</h3>
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
                      placeholder="Enter Your Name"
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
                      placeholder="Enter Your Email"
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
                      name="username"
                      placeholder="Enter Your Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="party-name mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password cannot be changed here"
                      disabled
                      className="form-control"
                      value="********"
                    />
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
                      <option value="">Select Access Control</option>
                      <option value="view">View</option>
                      <option value="view / add">View / Add</option>
                      <option value="view / add / edit">
                         View / Add / Edit
                      </option>
                      <option value="view / add / edit / delete">
                         View / Add / Edit / Delete
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-submit px-4"
                  disabled={updating}
                >
                  {updating ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="reset"
                  className="btn btn-clear px-4"
                  disabled={updating}
                >
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

export default UserEdit;
