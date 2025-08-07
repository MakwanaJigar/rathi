import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMakes,
  exportMakes,
  deleteMake,
  importMakes,
} from "../../redux/actions/makeActions";

const Make = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { makes, loading, error } = useSelector((state) => state.make);
  const exporting = useSelector((state) => state.make.exporting);

  const [filteredMakes, setFilteredMakes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchMakes());
  }, [dispatch]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = makes.filter((item) =>
      (item.name || "").toLowerCase().includes(q)
    );
    setFilteredMakes(filtered);
    setCurrentPage(1);
  }, [searchQuery, makes]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMakes.slice(start, start + itemsPerPage);
  }, [filteredMakes, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > Math.ceil(filteredMakes.length / itemsPerPage))
      return;
    setCurrentPage(page);
  };

  const handleExportClick = () => {
    dispatch(exportMakes());
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this make?")) {
      dispatch(deleteMake(id));
    }
  };

  const handleSubmitImport = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv_file", selectedFile); // backend field name must match

    await dispatch(importMakes(formData));
    await dispatch(fetchMakes());

    setShowImportModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Make
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Make</h3>
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

              <button
                className="import-btn"
                onClick={() => setShowImportModal(true)}
              >
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
                onClick={() => navigate("/make-add")}
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
                      <th className="fw-300">Name</th>
                      <th className="fw-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="w-75">{item.name}</td>
                          <td className="text-center action-btns w-25">
                            <button
                              className="btn btn-sm me-1"
                              onClick={() =>
                                navigate(`/make-edit/${item.id}`, {
                                  state: { makeData: item },
                                })
                              }
                            >
                              <i className="fas fa-pen" />
                            </button>
                            <button
                              className="btn btn-sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                {filteredMakes.length > itemsPerPage && (
                  <nav aria-label="Pagination">
                    <ul className="pagination justify-content-end">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => changePage(currentPage - 1)}
                        >
                          Prev
                        </button>
                      </li>
                      {Array.from(
                        {
                          length: Math.ceil(filteredMakes.length / itemsPerPage),
                        },
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
                        className={`page-item ${currentPage ===
                          Math.ceil(filteredMakes.length / itemsPerPage)
                          ? "disabled"
                          : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => changePage(currentPage + 1)}
                        >
                          Next
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

      {/* Modal */}
      {showImportModal && (
        <div className="import-modal-container">
          <div className="import-modal-box">
            <h5>📁 Upload CSV File</h5>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <div className="import-modal-actions">
              <button className="import-btn-modal" onClick={handleSubmitImport}>
                Upload
              </button>
              <button
                className="import-btn-modal-cancel"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Make;
