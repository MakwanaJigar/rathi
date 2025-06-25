import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SalesRepresentative = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData((prevData) => [...prevData, formData]);
        setFormData({ name: "", phone: "", email: "" }); // Clear the form
    };

    const handleReset = () => {
        setFormData({ name: "", phone: "", email: "" });
    };

    const handleDelete = (indexToDelete) => {
        setSubmittedData((prevData) =>
            prevData.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> Sales Representative</p>
                    <div className="delivery-challan-top-title-container container">
                        <div className="export-addnew-btn0-container">
                            <a href="">Go Back</a>
                        </div>
                    </div>

                    {/* MAIN DATA */}
                    <div className="container challan-add-main-right-container py-3">
                        <div className="form-section client-info-container client-info-container">
                            <h3 className="">Sales Representative</h3>
                            <form onSubmit={handleSubmit} onReset={handleReset}>
                                <div className="mb-3 row">
                                    <label htmlFor="name" className="col-sm-2 col-form-label">
                                        Name
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="phone" className="col-sm-2 col-form-label">
                                        Phone Number
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Enter Your Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">
                                        Email Id
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter Your Email Id"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
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
                        {/* <div class="d-flex gap-3">
                                <button type="submit" class="btn btn-submit px-4">
                                    Submit
                                </button>
                                <button type="reset" class="btn btn-clear px-4">
                                    Clear
                                </button>
                            </div> */}

                        {submittedData.length > 0 && (
                            <div className="container mt-3">

                                <table className="table align-middle table-bordered">
                                    <thead className="table-light ">
                                        <tr>
                                            <th className="fw-300">Name</th>
                                            <th className="fw-300">Phone</th>
                                            <th className="fw-300">Email Id</th>
                                            <th className="fw-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submittedData.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.name}</td>
                                                <td>{entry.phone}</td>
                                                <td>{entry.email}</td>
                                                <td className="text-center action-btns">
                                                    <button className="btn btn-sm me-1">
                                                        <i className="fas fa-pen"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default SalesRepresentative;
