import axios from "axios";
import { saveAs } from "file-saver";

export const FETCH_SALES_REPS_SUCCESS = "FETCH_SALES_REPS_SUCCESS";
export const ADD_SALES_REP_REQUEST = "ADD_SALES_REP_REQUEST";
export const ADD_SALES_REP_SUCCESS = "ADD_SALES_REP_SUCCESS";
export const ADD_SALES_REP_FAIL = "ADD_SALES_REP_FAIL";
export const EXPORT_SALES_REP_REQUEST = "EXPORT_SALES_REP_REQUEST";
export const EXPORT_SALES_REP_SUCCESS = "EXPORT_SALES_REP_SUCCESS";
export const EXPORT_SALES_REP_FAIL = "EXPORT_SALES_REP_FAIL";
export const DELETE_REP_SUCCESS = "DELETE_REP_SUCCESS";
export const DELETE_REP_FAIL = "DELETE_REP_FAIL";
export const UPDATE_SALES_REP_REQUEST = "UPDATE_SALES_REP_REQUEST";
export const UPDATE_SALES_REP_SUCCESS = "UPDATE_SALES_REP_SUCCESS";
export const UPDATE_SALES_REP_FAIL = "UPDATE_SALES_REP_FAIL";
export const IMPORT_SALES_REP_REQUEST = "IMPORT_SALES_REP_REQUEST";
export const IMPORT_SALES_REP_SUCCESS = "IMPORT_SALES_REP_SUCCESS";
export const IMPORT_SALES_REP_FAILURE = "IMPORT_SALES_REP_FAILURE";

export const fetchSalesReps = () => {
  return async (dispatch) => {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/representative-list"
    );
    const data = await res.json();

    let reps = [];
    if (Array.isArray(data)) reps = data;
    else if (Array.isArray(data.data)) reps = data.data;
    else if (Array.isArray(data.representatives)) reps = data.representatives;
    dispatch({ type: FETCH_SALES_REPS_SUCCESS, payload: reps });
  };
};

/* ── add representative (POST) ── */
export const addSalesRep = (payload) => async (dispatch) => {
  dispatch({ type: ADD_SALES_REP_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/add_representative",
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
      dispatch({ type: ADD_SALES_REP_SUCCESS });
      return {
        ok: true,
        message: data?.message || "Sales representative added successfully!",
      };
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
export const exportRepresentative = () => async (dispatch) => {
  dispatch({ type: EXPORT_SALES_REP_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-representatives"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob(); // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `representative_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_SALES_REP_SUCCESS });
  } catch (err) {
    dispatch({
      type: EXPORT_SALES_REP_FAIL,
      payload: err.message || "Export failed",
    });
  }
};

// delete

export const deleteRepresentative = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://replete-software.com/projects/rathi/api/delete_representative/${id}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) throw new Error("Failed to delete representative");

    dispatch({ type: DELETE_REP_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_REP_FAIL, payload: err.message });
  }
};

// edit

export const updateSalesRep = (id, payload) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://replete-software.com/projects/rathi/api/update_representative/${id}`,
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

    return {
      ok: isSuccess,
      message:
        data?.message || (isSuccess ? "Updated successfully" : "Update failed"),
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message || "Something went wrong",
    };
  }
};

// import
export const importSalesRepresentatives = (formData) => async (dispatch) => {
  dispatch({ type: IMPORT_SALES_REP_REQUEST });

  try {
    const response = await axios.post(
      "https://replete-software.com/projects/rathi/api/import-representatives",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({ type: IMPORT_SALES_REP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: IMPORT_SALES_REP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
