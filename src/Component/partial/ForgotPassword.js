import React from 'react';
import logo from '../../Assets/login/login-logo.png'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
  
    const GoToConfirmPassword = () => {
      navigate('/confirm-password')
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
              <h3 className="mb-3 text-success fw-bold">Forgot Password</h3>
              <p className="text-muted">Please enter your email address to search for your account.</p>

              <form>
                <div className="mb-3 text-start">
                  <label htmlFor="username" className="form-label">User Name</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter Your User Name" />
                </div>

                <button type="submit" className="btn btn-success w-100" onClick={GoToConfirmPassword}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
