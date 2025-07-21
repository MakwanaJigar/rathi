import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../redux/actions/userActions";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ---------- Redux state ---------- */
  const { users, deletingId } = useSelector((state) => ({
    users: Array.isArray(state.user.users) ? state.user.users : [],
    deletingId: state.user.deletingId,
  }));

  /* ---------- Local UI state ---------- */
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------- Fetch users ---------- */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(fetchUsers());
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  /* ---------- Search filter ---------- */
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = users.filter((u) =>
      (u.name || "").toLowerCase().includes(q)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  /* ---------- Pagination ---------- */
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ---------- Delete handler ---------- */
  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master
          <i className="fa-solid fa-angles-right" /> User
        </p>

        <div className="challan-add-main-right-container">
          {/* Search + buttons */}
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>User</h3>
            </div>
            <div className="make-list-btns">
              <div className="make-list-search">
                <i className="fa-solid fa-magnifying-glass" />
                <input
                  type="search"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* <button className="import-btn">
                <i className="fa-solid fa-upload" /> Import
              </button>
              <button className="export-btn">
                <i className="fa-solid fa-download" /> Export
              </button> */}
              <button className="add-btn" onClick={() => navigate("/user-add")}>
                <i className="fa-solid fa-plus" /> Add
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-3">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                <table className="table align-middle table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Access Control</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((u) => (
                        <tr key={u.id}>
                          <td>{u.name || "N/A"}</td>
                          <td>{u.username || "N/A"}</td>
                          <td>{u.email || "N/A"}</td>
                          <td>{u.access_control || "N/A"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm me-1"
                              onClick={() =>
                                navigate(`/user-edit/${u.id}`, {
                                  state: { userData: u },
                                })
                              }
                            >
                              <i className="fas fa-pen" />
                            </button>
                            <button
                              className="btn btn-sm"
                              disabled={deletingId === u.id}
                              onClick={() => handleDelete(u.id)}
                            >
                              {deletingId === u.id ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <i className="fas fa-trash" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="User pagination">
                    <ul className="pagination justify-content-end">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => changePage(currentPage - 1)}
                        >
                          <i className="fa-solid fa-arrow-left" />
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => changePage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => changePage(currentPage + 1)}
                        >
                          <i className="fa-solid fa-arrow-right" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
