import { saveAs } from "file-saver"; 

// Action types
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAIL    = "ADD_ITEM_FAIL";

export const EXPORT_ITEMS_REQUEST    =  "EXPORT_ITEMS_REQUEST";
export const EXPORT_ITEMS_SUCCESS    =  "EXPORT_ITEMS_SUCCESS";
export const EXPORT_ITEMS_FAIL       =  "EXPORT_ITEMS_FAIL";

// GET  list
export const fetchItems = () => async (dispatch) => {
  const res  = await fetch(
    "https://replete-software.com/projects/rathi/api/item-list"
  );
  const data = await res.json();

  const items =
    Array.isArray(data)        ? data :
    Array.isArray(data.data)   ? data.data :
    Array.isArray(data.items)  ? data.items : [];

  dispatch({ type: FETCH_ITEMS_SUCCESS, payload: items });
};



// POST  add‑item
export const addItem = (payload) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_REQUEST });
  try {
    const res  = await fetch(
      "https://replete-software.com/projects/rathi/api/additem",
      {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(payload),
      }
    );
    const data = await res.json();

    const ok =
      res.ok &&
      (data.status === 1 || data.status === "success" || data.error === false);

    if (!ok) throw new Error(data.message || "Failed to add item.");

    dispatch({ type: ADD_ITEM_SUCCESS, payload: data.data ?? payload });
    return { ok: true, message: data.message || "Item added successfully." };
  } catch (err) {
    dispatch({ type: ADD_ITEM_FAIL, payload: err.message });
    return { ok: false, message: err.message };
  }
};






// GET  export‑items  ➜ download CSV to the user’s machine
export const exportItems = () => async dispatch => {
  dispatch({ type: EXPORT_ITEMS_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-items"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob();               // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `items_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_ITEMS_FAIL, payload: err.message || "Export failed" });
  }
};