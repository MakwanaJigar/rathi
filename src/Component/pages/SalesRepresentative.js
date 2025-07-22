import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSalesReps ,exportRepresentative , deleteRepresentative} from "../../redux/actions/representativeActions";

const SalesRepresentative = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  /* ── Select representatives from Redux ── */
  const reps = useSelector((state) =>
    Array.isArray(state.salesRep.representatives)
      ? state.salesRep.representatives
      : []
  );

     const exporting = useSelector((state) => state.salesRep.exporting);
  

  /* ── Local UI state ── */
  const [filteredReps, setFilteredReps] = useState([]);
  const [searchQuery, setSearchQuery]   = useState("");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Fetch reps once ── */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(fetchSalesReps());
        setError(null);
      } catch {
        setError("Failed to fetch representatives.");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  /* ── Search filter ── */
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = reps.filter((r) =>
      (r.name || r.representative_name || "").toLowerCase().includes(q)
    );
    setFilteredReps(filtered);
    setCurrentPage(1);
  }, [searchQuery, reps]);

  /* ── Pagination helpers ── */
  const totalPages = Math.ceil(filteredReps.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReps.slice(start, start + itemsPerPage);
  }, [filteredReps, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleExportClick = () => {
      dispatch(exportRepresentative());
    };

// delete
const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this make?")) {
    dispatch(deleteRepresentative(id));
  }
};


  /* ── UI ── */
  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master
          <i className="fa-solid fa-angles-right" /> Sales Representative
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Sales Representative</h3>
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
                onClick={() => navigate("/sales-representative-add")}
              >
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
                      <th>Phone</th>
                      <th>Email</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((r) => (
                        <tr key={r.id}>
                          <td>{r.name || r.representative_name || "-"}</td>
                          <td>{r.phone || "-"}</td>
                          <td>{r.email || "-"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm me-1"
                              onClick={() =>
                                navigate(`/sales-representative-edit/${r.id}`, {
                                  state: { repData: r },
                                })
                              }
                            >
                              <i className="fas fa-pen" />
                            </button>
                            <button
                              className="btn btn-sm"
                              onClick={() => handleDelete(r.id)}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Rep pagination">
                    <ul className="pagination justify-content-end">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                          <i className="fa-solid fa-arrow-left" />
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => changePage(page)}>
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => changePage(currentPage + 1)}>
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

export default SalesRepresentative;
