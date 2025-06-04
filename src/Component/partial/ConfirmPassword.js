import React, { useState } from 'react';
import logo from '../../Assets/login/login-logo.png'
import { useNavigate } from 'react-router-dom';



const ConfirmPassword = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const GoToHome = () => {
    navigate('/')
  }
  return (
    <>
      <div className="container-fluid login-container">
        <div className="row">
          {/* Left Image Section */}
          <div className="col-md-6 login-image d-none d-md-block"></div>

          {/* Right Form Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="form-section text-center ">
              <img src={logo} alt="Logo" className="logo" />
              <h3 className="mb-3 text-success fw-bold">Confirm Password</h3>

              <form>
                 <div className="mb-3 text-start position-relative">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="********"
                    />
                    <span
                      className="input-group-text toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-3 text-start position-relative">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="********"
                    />
                    <span
                      className="input-group-text toggle-password"
                      onClick={() => setConfirmPassword(!showConfirmPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      {showConfirmPassword ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100" onClick={GoToHome}>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmPassword
