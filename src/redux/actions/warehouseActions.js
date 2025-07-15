import { saveAs } from "file-saver"; 


export const FETCH_WAREHOUSE_SUCCESS = 'FETCH_WAREHOUSE_SUCCESS';
export const EXPORT_WAREHOUSE_REQUEST    =  "EXPORT_WAREHOUSE_REQUEST";
export const EXPORT_WAREHOUSE_SUCCESS    =  "EXPORT_WAREHOUSE_SUCCESS";
export const EXPORT_WAREHOUSE_FAIL       =  "EXPORT_WAREHOUSE_FAIL";

export const fetchWarehouses = () => {
  return async (dispatch) => {
    const res = await fetch(
      'https://replete-software.com/projects/rathi/api/warehouse-list'
    );
    const data = await res.json();
    dispatch({ type: FETCH_WAREHOUSE_SUCCESS, payload: data });
  };
};






// GET  export‑items  ➜ download CSV to the user’s machine
export const exportWarehouse = () => async dispatch => {
  dispatch({ type: EXPORT_WAREHOUSE_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-warehouse"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob();               // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `representative_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_WAREHOUSE_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_WAREHOUSE_FAIL, payload: err.message || "Export failed" });
  }
};