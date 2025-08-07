import React, { useState, useEffect } from 'react';
import logo from '../../Assets/login/login-logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../../redux/actions/loginAction'

const Login = () => {

const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };


  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isLocked && lockTimeLeft > 0) {
      timer = setInterval(() => {
        setLockTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [isLocked, lockTimeLeft]);

  const GoToForgotPassword = () => {
    navigate('/forgot-password');
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (isLocked) return;

  //   if (!username.trim() || !password.trim()) {
  //     setModalMessage('Please fill in both username and password.');
  //     setShowModal(true);
  //     return;
  //   }

  //   const dummyUser = {
  //     username: 'admin',
  //     password: 'admin',
  //   };

  //   if (username === dummyUser.username && password === dummyUser.password) {
  //     localStorage.setItem('isLoggedIn', true);
  //     navigate('/');
  //   } else {
  //     const attempts = loginAttempts + 1;
  //     setLoginAttempts(attempts);

  //     if (attempts >= 3) {
  //       setIsLocked(true);
  //       setLockTimeLeft(60); 
  //       setModalMessage('Too many failed attempts. Try again in 2 minutes.');
  //     } else {
  //       setModalMessage(`Invalid username or password. Attempt ${attempts} of 3.`);
  //     }

  //     setShowModal(true);
  //   }
  // };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };


  return (
    <div className="container-fluid login-container">
      <div className="row">
        {/* Left Image Section */}
        <div className="col-md-6 login-image d-none d-md-block"></div>

        {/* Right Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="form-section text-center">
            <img src={logo} alt="Logo" className="logo" />
            <h3 className="mb-3 text-success fw-bold">Let's Get Started</h3>
            <p className="text-muted">Welcome back! Please enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Your User Name"
                  value={email} onChange={(e) => setEmail(e.target.value)} 
                  disabled={isLocked}
                />
              </div>

              <div className="mb-3 text-start position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="********"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    disabled={isLocked}
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

              <div className="d-flex justify-content-end mb-3">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    GoToForgotPassword();
                  }}
                >
                  Forgot Password ?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={isLocked}
              >
                {isLocked ? `Try again in ${lockTimeLeft}s` : 'Sign In'}
                {/* {loading ? 'Logging in...' : 'Login'} */}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ERROR MSG POPUP */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Alert</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-danger">{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
