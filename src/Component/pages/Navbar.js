import React from "react";
import { useSidebar } from "../../Context/SidebarContext";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/loginAction";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // LOGOUT HANDLE BTN
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Example user object
  const user = {
    firstName: "Rathi",
    lastName: "Ispat",
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
  };

  const hasImage = user.profileImage && user.profileImage.trim() !== "";
  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom px-3 py-3 mobile-nav">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-light me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample"
            onClick={toggleSidebar}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <span className="text-white fs-5">
            Welcome Back, {user.firstName} {user.lastName}
          </span>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
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
          <span className="text-white">
            {user.firstName} {user.lastName}{" "}
            <i className="bi bi-caret-down-fill"></i>
          </span>
          {/* <a className="text-white"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBG38BHUgOe0Jvs_IRhTQY15puBQ6BBNvU9w&s" className='logout-down-arrow'/></a> */}
          <div className="navbar-dropdown-menu-section-wrapper">
            <a
              className="navbar-dropdown-menu-section-trigger"
              onClick={() =>
                document
                  .querySelector(".navbar-dropdown-menu-section-menu")
                  .classList.toggle("active")
              }
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBG38BHUgOe0Jvs_IRhTQY15puBQ6BBNvU9w&s"
                className="navbar-dropdown-menu-section-arrow"
                alt="menu"
              />
            </a>

            <div className="navbar-dropdown-menu-section-menu">
             <Link
                to="/profile"
                className="navbar-dropdown-menu-section-item"
                >
                My Profile
                </Link>
              <button
                className="navbar-dropdown-menu-section-item logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
