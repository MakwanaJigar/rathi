import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWarehouses, exportWarehouse, deleteWarehouse } from "../../redux/actions/warehouseActions";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const warehouses = useSelector((state) => state.warehouse.warehouses);

  const exporting = useSelector((state) => state.warehouse.exporting);


  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from Redux store
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchWarehouses());
        setError(null);
      } catch (err) {
        setError("Failed to load warehouse data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  // Search logic
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = warehouses.filter(
      (w) =>
        (w.warehouse_name || "").toLowerCase().includes(q) ||
        (w.warehouse_address || "").toLowerCase().includes(q)
    );
    setFilteredWarehouses(filtered);
    setCurrentPage(1);
  }, [searchQuery, warehouses]);

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredWarehouses.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWarehouses.slice(start, start + itemsPerPage);
  }, [filteredWarehouses, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };



  const handleExportClick = () => {
    dispatch(exportWarehouse());
  };

  // delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      dispatch(deleteWarehouse(id));
    }
  };


  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master
          <i className="fa-solid fa-angles-right" /> Warehouse
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Warehouse</h3>
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
              <button className="add-btn" onClick={() => navigate("/warehouser-add")}>
                <i className="fa-solid fa-plus" /> Add
              </button>
            </div>
          </div>

          {/* list */}
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
                      <th>Warehouse Name</th>
                      <th>Warehouse Address</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((w) => (
                        <tr key={w.id ?? w.warehouse_id}>
                          <td>{w.warehouse_name || "N/A"}</td>
                          <td>{w.warehouse_address || "N/A"}</td>
                          <td className="text-center">
                            <button className="btn btn-sm me-1">
                              <i className="fas fa-pen" />
                            </button>
                            <button className="btn btn-sm" onClick={() => handleDelete(w.id ?? w.warehouse_id)}>
                              <i className="fas fa-trash" />
                            </button>

                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Warehouse pagination">
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

export default Warehouse;
