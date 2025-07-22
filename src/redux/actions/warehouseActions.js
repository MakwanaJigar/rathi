import { saveAs } from "file-saver";


export const FETCH_WAREHOUSE_SUCCESS = 'FETCH_WAREHOUSE_SUCCESS';
export const EXPORT_WAREHOUSE_REQUEST = "EXPORT_WAREHOUSE_REQUEST";
export const EXPORT_WAREHOUSE_SUCCESS = "EXPORT_WAREHOUSE_SUCCESS";
export const EXPORT_WAREHOUSE_FAIL = "EXPORT_WAREHOUSE_FAIL";
export const ADD_WAREHOUSE_REQUEST = "ADD_WAREHOUSE_REQUEST";
export const ADD_WAREHOUSE_SUCCESS = "ADD_WAREHOUSE_SUCCESS";
export const ADD_WAREHOUSE_FAIL = "ADD_WAREHOUSE_FAIL";

export const DELETE_WAREHOUSE_SUCCESS = "DELETE_WAREHOUSE_SUCCESS";
export const DELETE_WAREHOUSE_FAIL = "DELETE_WAREHOUSE_FAIL";

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
    const fileName = `Warehouse_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_WAREHOUSE_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_WAREHOUSE_FAIL, payload: err.message || "Export failed" });
  }
};





/* ---------- ADD ---------- */
export const addWarehouse = (payload) => async (dispatch) => {
  dispatch({ type: ADD_WAREHOUSE_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/add-warehouse",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    const isSuccess =
      res.ok ||
      data?.status === 1 ||
      data?.status === "success" ||
      data?.message?.toLowerCase()?.includes("success");

    if (isSuccess) {
      dispatch({ type: ADD_WAREHOUSE_SUCCESS });
      return { ok: true, message: data?.message || "Warehouse added successfully!" };
    } else {
      const errMsg = data?.message || "Failed to add warehouse.";
      dispatch({ type: ADD_WAREHOUSE_FAIL, payload: errMsg });
      return { ok: false, message: errMsg };
    }
  } catch (err) {
    dispatch({ type: ADD_WAREHOUSE_FAIL, payload: err.message });
    return { ok: false, message: err.message || "Network error." };
  }
};



// delete

export const deleteWarehouse = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://replete-software.com/projects/rathi/api/deletewarehouse/${id}`,
      {
        method: "POST", // ✅ Correct method
      }
    );

    if (!res.ok) throw new Error("Failed to delete warehouse");

    dispatch({ type: DELETE_WAREHOUSE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_WAREHOUSE_FAIL, payload: err.message });
  }
};
