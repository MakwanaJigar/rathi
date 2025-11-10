// src/pages/Item.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchItems,
  exportItems,
  deleteItem,
} from "../../redux/actions/itemActions";


// =================================================================
// 1. DELETE CONFIRMATION MODAL COMPONENT (Re-used/Modified with unique class)
// =================================================================
const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  // Return null if modal is not active
  if (!show) return null;

  // Uses 'show' and 'd-block' to force the Bootstrap modal to display
  // Unique class: delete-item-modal-backdrop
  return (
    <div className="modal fade show d-block delete-item-modal-backdrop" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      {/* Unique class: delete-item-modal-custom */}
      <div className="modal-dialog modal-dialog-centered delete-item-modal-custom">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Delete Item</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this item?</p>
          </div>

          <div className="modal-footer justify-content-start border-top-0 pt-0">
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              Delete
            </button>
            <button 
              type="button" 
              className="btn btn-secondary ms-2" 
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


const Item = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    exporting,
    exportError,
  } = useSelector((state) => ({
    items: Array.isArray(state.item.items) ? state.item.items : [],
    exporting: state.item.exporting,
    exportError: state.item.exportError,
  }));

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Import modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);

  // --- NEW STATE FOR DELETE MODAL ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  // ----------------------------------

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(fetchItems());
        setError(null);
      } catch (_) {
        setError("Failed to fetch item data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredItems(
      items.filter((it) => (it.name || "").toLowerCase().includes(q))
    );
    setCurrentPage(1);
  }, [searchQuery, items]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // --- UPDATED handleDelete to OPEN MODAL ---
  const handleDelete = (id) => {
    setItemIdToDelete(id); // Set the ID
    setShowDeleteModal(true); // Open the modal
    // Note: Removed the window.confirm
  };

  // --- NEW FUNCTION to CONFIRM DELETION ---
  const confirmDelete = () => {
    if (itemIdToDelete) {
      dispatch(deleteItem(itemIdToDelete)); // Dispatch the delete action
    }
    // Reset state and close modal
    setShowDeleteModal(false);
    setItemIdToDelete(null);
  };
  // ------------------------------------------

  const handleSubmitImport = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv_file", selectedFile);

    try {
      setImporting(true);
      const response = await fetch(
        "https://replete-software.com/projects/rathi/api/import-items",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to import items");
      }

      await dispatch(fetchItems());
      alert("Items imported successfully!");
      setShowImportModal(false);
      setSelectedFile(null);
    } catch (error) {
      alert(error.message || "Something went wrong during import.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right" /> Master{" "}
          <i className="fa-solid fa-angles-right" /> Item
        </p>

        <div className="challan-add-main-right-container">
          <div className="make-search-and-btn-container">
            <div className="make-title">
              <h3>Item</h3>
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
                onClick={() => dispatch(exportItems())}
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

              <button className="add-btn" onClick={() => navigate("/item-add")}>
                <i className="fa-solid fa-plus" /> Add
              </button>
            </div>
          </div>

          {exportError && (
            <div className="alert alert-danger mt-2">{exportError}</div>
          )}

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
                      <th>Item Name</th>
                      <th>Approx Weight</th>
                      <th>HSN Code</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.approx_weight}</td>
                          <td>{item.hsn_code}</td>
                          <td className="text-center action-btns">
                            <button
                              className="btn btn-sm me-1"
                              onClick={() => navigate(`/item-edit/${item.id}`)}
                            >
                              <i className="fas fa-pen" />
                            </button>
                            <button
                              className="btn btn-sm"
                              // Call the new handleDelete to open the modal
                              onClick={() => handleDelete(item.id)}
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

                {totalPages > 1 && (
                  <nav aria-label="Item pagination">
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
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="import-modal-container">
          <div className="import-modal-box">
            <h5>📦 Import Item CSV</h5>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <div className="import-modal-actions">
              <button
                className="import-btn-modal"
                onClick={handleSubmitImport}
                disabled={importing}
              >
                {importing ? "Uploading..." : "Upload"}
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

export default Item;