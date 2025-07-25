import React from 'react'
import { useSidebar } from '../../Context/SidebarContext'

const Navbar = () => {
       const { toggleSidebar } = useSidebar();

    // Example user object
    const user = {
        firstName: "Rathi",
        lastName: "Ispat",
        profileImage: "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png" 
    };

    const hasImage = user.profileImage && user.profileImage.trim() !== "";
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-custom px-3 py-3 mobile-nav">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span className="text-white fs-5">Welcome Back, {user.firstName} {user.lastName}</span>
                </div>

                <div className="ms-auto d-flex align-items-center gap-3">
                    {/* <div className="circle-icon">
                        <i className="fa-solid fa-message"></i>
                        <div className="notification-dot"></div>
                    </div> */}
                    {/* <div className="circle-icon">
                        <i className="fa-solid fa-bell"></i>
                        <div className="notification-dot"></div>
                    </div> */}
                    <div className="circle-icon">
                           {hasImage ? (
                            <img
                                src={user.profileImage}
                                alt="User"
                                className="img-fluid rounded-circle"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <span className="fw-bold text-success">{initials}</span>
                        )}
                    </div>
                     <span className="text-white">{user.firstName} {user.lastName} <i className="bi bi-caret-down-fill"></i></span>
                    {/* <span className="text-white">Admin Name <i className="bi bi-caret-down-fill"></i></span> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar
