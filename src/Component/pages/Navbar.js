import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-custom px-3 py-3">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span className="text-white fs-5">Welcome Back, Admin Name</span>
                </div>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <div className="circle-icon">
                        <i className="fa-solid fa-message"></i>
                        <div className="notification-dot"></div>
                    </div>
                    <div className="circle-icon">
                        <i className="fa-solid fa-bell"></i>
                        <div className="notification-dot"></div>
                    </div>
                    <div className="circle-icon">
                        <span className="fw-bold text-primary">AN</span>
                    </div>
                    <span className="text-white">Admin Name <i className="bi bi-caret-down-fill"></i></span>
                </div>
            </nav>
        </>
    )
}

export default Navbar
