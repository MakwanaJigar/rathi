import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Make = () => {
    const [formData, setFormData] = useState({
        name: "",
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
        setFormData({ name: "" }); // Clear the form
    };

    const handleReset = () => {
        setFormData({ name: "" });
    };

    const handleDelete = (indexToDelete) => {
        setSubmittedData((prevData) =>
            prevData.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <div className="col-12 col-md-3 col-lg-2 sidebar">
                        <nav className="nav flex-column">
                            <Link className="nav-link sidebar-links" to="/">
                                <i className="fa-solid fa-house"></i> Dashboard
                            </Link>

                            <Link className="nav-link sidebar-links" to="/delivery-challan">
                                <i className="fa-solid fa-house"></i> Delivery Challan
                            </Link>

                            <div className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle sidebar-links btn btn-link text-start w-100"
                                    type="button"
                                    id="masterDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-house"></i> Master
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="masterDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/challan-add">
                                            Client
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/delivery-challan">
                                            Sales Representative
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/home">
                                            Make
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/home">
                                            User
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>


                    {/* <!-- Main Content --> */}
                    <div className="col-12 col-md-9 col-lg-10 main-content">
                        {/* MAIN DATA */}
                        <div className="container challan-add-main-right-container">
                            <div className="form-section client-info-container client-info-container">
                                <h3 className="">Item</h3>
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
                                                required
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
                                                <th className="fw-300">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submittedData.map((entry, index) => (
                                                <tr key={index}>
                                                    <td className="w-75">{entry.name}</td>
                                                    <td className="text-center action-btns w-25">
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
                </div>
            </div >
        </>
    );
};

export default Make;
