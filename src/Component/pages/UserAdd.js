import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserAdd = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="container-fluid">
                <div className="container main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> User Add</p>
                    <div className="delivery-challan-top-title-container container">
                        <h3 className="main-container-title">User</h3>
                        <div className="export-addnew-btn0-container">
                            <Link to="/user">Go Back</Link>
                        </div>
                    </div>

                    {/* MAIN DATA */}
                    <div className="container challan-add-main-right-container py-5">
                        <div className="form-section client-info-container">
                            <h3>User</h3>
                            <form className="py-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="party-name mb-3">
                                            <label>Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Name" />
                                        </div>
                                        <div className="party-name mb-3">
                                            <label>User Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Your User Name" />
                                        </div>

                                        {/* Password Field with Eye Toggle */}
                                        <div className="party-name mb-3 position-relative">
                                            <label>Password</label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="*********"
                                            />
                                            <span
                                                role="button"
                                                className="add-user-page-password-field"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '15px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    color: '#888'
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
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button type="submit" className="btn btn-submit px-4">
                                        Submit
                                    </button>
                                    <button type="reset" className="btn btn-clear px-4">
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAdd;
