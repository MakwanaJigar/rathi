import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClients, exportClients, deleteClient } from "../../redux/actions/clientActions";

const Client = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clients = useSelector((state) =>
    Array.isArray(state.client.clients) ? state.client.clients : []
  );

  const exporting = useSelector((state) => state.client.exporting);

  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        await dispatch(fetchClients());
        setError(null);
      } catch (err) {
        setError("Failed to fetch client data.");
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, [dispatch]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = clients.filter((c) =>
      (c.company_name || "").toLowerCase().includes(q)
    );
    setFilteredClients(filtered);
    setCurrentPage(1);
  }, [searchQuery, clients]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleExportClick = () => {
    dispatch(exportClients());
  };


  // delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteClient(id));
    }
  };



  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Client
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Client</h3>
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

              <button className="import-btn">
                <i className="fa-solid fa-download" /> Import
              </button>

              <button
                className="export-btn"
                onClick={handleExportClick}
                disabled={exporting}
              >
                {exporting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" /> Exporting…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-upload" /> Export
                  </>
                )}
              </button>

              <button
                className="add-btn"
                onClick={() => navigate("/client-add")}
              >
                <i className="fa-solid fa-plus" /> Add
              </button>
            </div>
          </div>

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
                      <th>Company</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>GST No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.company_name || "-"}</td>
                          <td>{item.client_personal_name || "-"}</td>
                          <td>{item.phone || "-"}</td>
                          <td>{item.email || "-"}</td>
                          <td>{item.gst_no || "-"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm me-1"
                              onClick={() => navigate(`/client/edit/${item.id}`)}
                            >
                              <i className="fas fa-pen" />
                            </button>
                            <button className="btn btn-sm" onClick={() => handleDelete(item.id)}>
                              <i className="fas fa-trash" />
                            </button>

                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <nav aria-label="Client pagination">
                    <ul className="pagination justify-content-end">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => changePage(currentPage - 1)}
                        >
                          <i className="fa-solid fa-arrow-left" />
                        </button>
                      </li>

                      {Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""
                            }`}
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
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                          }`}
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

export default Client;
