import { saveAs } from "file-saver"; 


export const FETCH_MAKES_SUCCESS = "FETCH_MAKES_SUCCESS";
export const EXPORT_MAKES_REQUEST    =  "EXPORT_MAKES_REQUEST";
export const EXPORT_MAKES_SUCCESS    =  "EXPORT_MAKES_SUCCESS";
export const EXPORT_MAKES_FAIL       =  "EXPORT_MAKES_FAIL";


export const fetchMakes = () => {
  return async (dispatch) => {
    const res = await fetch("https://replete-software.com/projects/rathi/api/make-list");
    const data = await res.json();

    let items = [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data.data)) items = data.data;
    else if (Array.isArray(data.items)) items = data.items;

    dispatch({ type: FETCH_MAKES_SUCCESS, payload: items });
  };
};







// GET  export‑items  ➜ download CSV to the user’s machine
export const exportMakes = () => async dispatch => {
  dispatch({ type: EXPORT_MAKES_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-makes"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob();               // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `representative_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_MAKES_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_MAKES_FAIL, payload: err.message || "Export failed" });
  }
};








