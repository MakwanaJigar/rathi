import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const ClientAdd = () => {

    const [AddClientData, serAddClientData] = useState({
        companyname: '',
        personalname: '',
        phonenumber: '',
        email: '',
        gst: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        shippingaddress1: '',
        shippingaddress2: '',
        shippingcity: '',
        shippingstate: '',
        shippingzipcode: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        serAddClientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', AddClientData);
        // You can send formData to an API here
    };

    return (
        <>

            <div className="container-fluid">
                <div className=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> Client</p>
                    <div className="delivery-challan-top-title-container ">
                        <div className="export-addnew-btn0-container-back-btn">
                            <Link to="/client" className='float-right d-flex'>Go Back</Link>
                        </div>
                    </div>

                    {/* MAIN DATA */}
                    <form className=" challan-add-main-right-container py-5" onSubmit={handleSubmit}>
                        <div className="border p-4 rounded client-add-box">
                            <h4 className="fw-bold mb-4 pb-2 border-bottom">Client</h4>

                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6 pe-md-5">
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Company Name</label>
                                        <input type="text" 
                                            name="companyname"
                                            value={AddClientData.companyname}
                                            onChange={handleChange} className="form-control" placeholder="Enter Your Company Name" />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Phone No.</label>
                                        <input type="text"
                                        name="phonenumber"
                                        value={AddClientData.phonenumber}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your Phone No." />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">GST No.</label>
                                        <input type="text"
                                        name="gst"
                                        value={AddClientData.gst}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your GST No." />
                                    </div>
                                </div>

                                {/* Right Column with Divider */}
                                <div className="col-md-6 ps-md-5 border-start">
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">C. Personal Name</label>
                                        <input type="text"
                                        name="personalname"
                                        value={AddClientData.personalname}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your C.Personal Name" />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Email Id</label>
                                        <input type="email"
                                        name="email"
                                        value={AddClientData.email}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your Email Id" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border p-4 rounded client-add-box">
                            <h4 className="fw-bold mb-4 pb-2 border-bottom">Billing Address</h4>

                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6 pe-md-5">
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Address 1</label>
                                        <input type="text"
                                        name="address1"
                                        value={AddClientData.address1}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your Address 1" />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">City</label>
                                        <input type="text"
                                        name="city"
                                        value={AddClientData.city}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your City" />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Zip Code</label>
                                        <input type="text"
                                        name="zipcode"
                                        value={AddClientData.zipcode}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your Zip Code" />
                                    </div>
                                </div>

                                {/* Right Column with Divider */}
                                <div className="col-md-6 ps-md-5 border-start">
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">Address 2</label>
                                        <input type="text"
                                        name="address2"
                                        value={AddClientData.address2}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your Address 2" />
                                    </div>
                                    <div className="mb-3 client-add-input-container">
                                        <label className="form-label">State</label>
                                        <input type="text"
                                        name="state"
                                        value={AddClientData.state}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Enter Your State" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border p-4 rounded client-add-box">
                            <h4 className="fw-bold mb-3 pb-2 border-bottom">Shipping Address</h4>


                            {/* Header Row */}
                            <div className="row mb-2 fw-semibold text-muted border-bottom pb-3">
                                <div className="col-md-2">Address 1</div>
                                <div className="col-md-2">Address 2</div>
                                <div className="col-md-2">City</div>
                                <div className="col-md-2">State</div>
                                <div className="col-md-2">Zipcode</div>
                                <div className="col-md-2">Actions</div>
                            </div>

                            {/* Input Row */}
                            <div className="row align-items-center mt-4">
                                <div className="col-md-2 mb-2">
                                    <input type="text"
                                        name="shippingaddress1"
                                        value={AddClientData.shippingaddress1}
                                        onChange={handleChange}
                                    className="form-control" placeholder="Address 1" />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="text"
                                        name="shippingaddress2"
                                        value={AddClientData.shippingaddress2}
                                        onChange={handleChange}
                                    className="form-control" placeholder="Address 2" />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="text"
                                        name="shippingcity"
                                        value={AddClientData.shippingcity}
                                        onChange={handleChange}
                                    className="form-control" placeholder="City" />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="text"
                                        name="shippingstate"
                                        value={AddClientData.shippingstate}
                                        onChange={handleChange}
                                    className="form-control" placeholder="State" />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="text"
                                        name="shippingzipcode"
                                        value={AddClientData.shippingzipcode}
                                        onChange={handleChange}
                                    className="form-control" placeholder="Zipcode" />
                                </div>
                                <div className="col-md-2 mb-2 d-flex gap-2">
                                    <button type="button" className="btn btn-success">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    <button type="button" className="btn btn-success">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
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

        </>
    )
}

export default ClientAdd
