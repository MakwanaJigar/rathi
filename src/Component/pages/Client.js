import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchClients,
  exportClients,
  deleteClient,
  importWarehouse,
} from "../../redux/actions/clientActions";

// =================================================================
// 1. DELETE CONFIRMATION MODAL COMPONENT WITH UNIQUE BOOTSTRAP CLASSES
// =================================================================
const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  // Return null if modal is not active
  if (!show) return null;

  // Uses 'show' and 'd-block' to force the Bootstrap modal to display
  return (
    // The main modal container (backdrop) with a unique class
    <div className="modal fade show d-block delete-client-modal-backdrop" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      {/* Unique class for the dialog structure */}
      <div className="modal-dialog modal-dialog-centered delete-client-modal-custom">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Delete Client</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this client?</p>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              Delete
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// =================================================================

const Client = () => {
  const { importResult } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);

  // --- NEW STATE FOR DELETE MODAL ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  // ----------------------------------

  const clients = useSelector((state) =>
    Array.isArray(state.client.clients) ? state.client.clients : []
  );

  const exporting = useSelector((state) => state.client.exporting);
  const error = useSelector((state) => state.client.error);

  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        await dispatch(fetchClients());
      } catch (err) {
        console.error(err);
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

  // --- FUNCTION to OPEN MODAL ---
  const handleDelete = (id) => {
    setClientIdToDelete(id); // Set the ID
    setShowDeleteModal(true); // Open the modal
  };

  // --- FUNCTION to CONFIRM DELETION ---
  const confirmDelete = () => {
    if (clientIdToDelete) {
      dispatch(deleteClient(clientIdToDelete)); // Dispatch the delete action
    }
    // Close modal and reset state
    setShowDeleteModal(false);
    setClientIdToDelete(null);
  };
  // ------------------------------------------

  const handleSubmitImport = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await dispatch(importWarehouse(formData));
      setShowImportModal(false);
      setSelectedFile(null);
    } catch (err) {
      alert("❌ Import failed. See console.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (importResult?.message) {
      alert(importResult.message);
      if (importResult.errors?.length > 0) {
        console.log(" Import errors:", importResult.errors);
        importResult.errors.forEach((err) => {
          console.warn(` Row ${err.row}: ${err.error}`);
        });
      }
    }

    if (error) {
      alert(` Error: ${error}`);
    }
  }, [importResult, error]);

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

              <button className="import-btn" onClick={() => setShowImportModal(true)}>
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

              <button className="add-btn" onClick={() => navigate("/client-add")}>
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
                            <button 
                                className="btn btn-sm" 
                                // Call the new handler
                                onClick={() => handleDelete(item.id)}
                            >
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
                          <button className="page-link" onClick={() => changePage(page)}>
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

      {/* Import Modal - Keeping original for context */}
      {showImportModal && (
        <div className="import-modal-container">
          <div className="import-modal-box">
            <h5>📦 Import Client CSV</h5>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <div className="import-modal-actions">
              <button className="import-btn-modal" onClick={handleSubmitImport}>
                Submit
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

      {/* RENDER NEW DELETE MODAL */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Client;