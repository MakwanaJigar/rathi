import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();                

    // ------------- form state -------------
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        access_control: "",
    });


    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // ------------- fetch existing record -------------
    useEffect(() => {
        const fetchSingleUser = async () => {
            try {

                const res = await fetch(
                    `https://replete-software.com/projects/rathi/api/user/${id}`
                );
                const data = await res.json();

                // Map the API keys → local state keys
                setFormData({
                    name: data.name ?? "",
                    email: data.email ?? "",
                    username: data.username ?? "",
                    password: "",
                    access_control: data.access_control ?? "",
                });
            } catch (err) {
                setAlert({ type: "danger", text: "Failed to load user: " + err.message });
            } finally {
                setLoading(false);
            }
        };

        fetchSingleUser();
    }, [id]);

    // ------------- generic change handler -------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ------------- submit (UPDATE) -------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setAlert(null);

        try {
            const res = await fetch(
                `https://replete-software.com/projects/rathi/api/update-user/${id}`, // ← id in path
                {
                    method: "PUT",           
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (res.ok && data?.status === "success") {
                setAlert({ type: "success", text: data.message || "User updated!" });
                setTimeout(() => navigate("/user"), 1500);
            } else {
                setAlert({
                    type: "danger",
                    text: data?.message || "Update failed – please retry.",
                });
            }
        } catch (err) {
            setAlert({ type: "danger", text: err.message || "Network error." });
        } finally {
            setSubmitting(false);
        }
    };

    // ------------- reset -------------
    const handleReset = () => {
        // restore original (quick way: reload page)
        window.location.reload();
    };

    // ------------- render -------------
    if (loading) return <div className="container-fluid">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="main-content">
                <p className="main-container-title">
                    Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
                    <i className="fa-solid fa-angles-right" /> User Edit
                </p>

                <div className="delivery-challan-top-title-container container">
                    <h3 className="main-container-title">User Edit</h3>
                    <div className="export-addnew-btn0-container">
                        <Link to="/user">Go Back</Link>
                    </div>
                </div>

                {/* === FORM === */}
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
                                    {/* Name */}
                                    <div className="party-name mb-3">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter Name"
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
                                            placeholder="Enter Email"
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
                                            placeholder="Enter User Name"
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="party-name mb-3 position-relative">
                                        <label>Password</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Leave blank to keep unchanged"
                                        />
                                        <span
                                            role="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                                color: "#888",
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
                                            <option value="view">None / View</option>
                                            <option value="add">None / View / Add</option>
                                            <option value="edit">None / View / Add / Edit</option>
                                            <option value="delete">
                                                None / View / Add / Edit / Delete
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-submit px-4"
                                    disabled={submitting}
                                >
                                    {submitting ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-clear px-4"
                                    disabled={submitting}
                                >
                                    Reset
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
