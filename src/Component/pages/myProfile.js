import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions/profileAction";

const Profile = () => {
  const dispatch = useDispatch();

  const { loading, profile, error } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Profile
        </p>

        {/* Loading */}
        {loading && <p>Loading profile...</p>}

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}
            
        {/* Profile Card */}
        {!loading && profile && (
          <div className="my-profile-page-main-section-card-wrapper">
            <div className="my-profile-page-main-section-card">
              <div className="my-profile-page-main-section-card-image">
                <img
                  src={profile.image || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211469.png"}
                  alt="Profile"
                />
              </div>

              <div className="my-profile-page-main-section-card-content">
                <h1 className="my-profile-page-main-section-card-name">
                  {profile.name}
                </h1>

                <p className="my-profile-page-main-section-card-email">
                  User Name :- {profile.username}
                </p>

                <p className="my-profile-page-main-section-card-email">
                  Email :- {profile.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
