import { saveAs } from "file-saver"; 


export const FETCH_SALES_REPS_SUCCESS = "FETCH_SALES_REPS_SUCCESS";
export const ADD_SALES_REP_REQUEST     = "ADD_SALES_REP_REQUEST";
export const ADD_SALES_REP_SUCCESS     = "ADD_SALES_REP_SUCCESS";
export const ADD_SALES_REP_FAIL        = "ADD_SALES_REP_FAIL";
export const EXPORT_SALES_REP_REQUEST    =  "EXPORT_SALES_REP_REQUEST";
export const EXPORT_SALES_REP_SUCCESS    =  "EXPORT_SALES_REP_SUCCESS";
export const EXPORT_SALES_REP_FAIL       =  "EXPORT_SALES_REP_FAIL";

export const fetchSalesReps = () => {
  return async (dispatch) => {
    const res = await fetch("https://replete-software.com/projects/rathi/api/representative-list");
    const data = await res.json();

    let reps = [];
    if (Array.isArray(data)) reps = data;
    else if (Array.isArray(data.data)) reps = data.data;
    else if (Array.isArray(data.representatives)) reps = data.representatives;

    dispatch({ type: FETCH_SALES_REPS_SUCCESS, payload: reps });
  };
};



/* ── add representative (POST) ─────────────────────────────────────── */
export const addSalesRep = (payload) => async (dispatch) => {
  dispatch({ type: ADD_SALES_REP_REQUEST });

  try {
    const res = await fetch("https://replete-software.com/projects/rathi/api/add_representative", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const isSuccess =
      res.ok ||
      data?.status === 1 ||
      data?.status === "success" ||
      data?.message?.toLowerCase()?.includes("success");

    if (isSuccess) {
      dispatch({ type: ADD_SALES_REP_SUCCESS });
      return { ok: true, message: data?.message || "Sales representative added successfully!" };
    } else {
      const errorMsg = data?.message || "Failed to add sales representative.";
      dispatch({ type: ADD_SALES_REP_FAIL, payload: errorMsg });
      return { ok: false, message: errorMsg };
    }
  } catch (err) {
    dispatch({ type: ADD_SALES_REP_FAIL, payload: err.message });
    return { ok: false, message: err.message || "Unexpected error occurred." };
  }
};








// GET  export‑items  ➜ download CSV to the user’s machine
export const exportRepresentative = () => async dispatch => {
  dispatch({ type: EXPORT_SALES_REP_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-representatives"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob();               // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `representative_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_SALES_REP_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_SALES_REP_FAIL, payload: err.message || "Export failed" });
  }
};