import { saveAs } from "file-saver"; 


export const FETCH_MAKES_SUCCESS = "FETCH_MAKES_SUCCESS";
export const EXPORT_MAKES_REQUEST =  "EXPORT_MAKES_REQUEST";
export const EXPORT_MAKES_SUCCESS =  "EXPORT_MAKES_SUCCESS";
export const EXPORT_MAKES_FAIL    =  "EXPORT_MAKES_FAIL";
export const ADD_MAKE_REQUEST  = "ADD_MAKE_REQUEST";
export const ADD_MAKE_SUCCESS  = "ADD_MAKE_SUCCESS";
export const ADD_MAKE_FAIL     = "ADD_MAKE_FAIL";
export const DELETE_MAKE_SUCCESS = "DELETE_MAKE_SUCCESS";
export const DELETE_MAKE_FAIL = "DELETE_MAKE_FAIL";
export const UPDATE_MAKE_REQUEST = "UPDATE_MAKE_REQUEST";
export const UPDATE_MAKE_SUCCESS = "UPDATE_MAKE_SUCCESS";
export const UPDATE_MAKE_FAIL = "UPDATE_MAKE_FAIL";


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




/* ---------- ADD ---------- */
export const addMake = (payload, /** optional */ onSuccess) => async dispatch => {
  dispatch({ type: ADD_MAKE_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/addmake",
      {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(payload),
      }
    );

    if (!res.ok)
      throw new Error((await res.json())?.message || "Failed to add make");

    const created = await res.json();           // API echoes back whole row

    // Add the new record to the list *optimistically* so UI updates instantly.
    dispatch({ type: ADD_MAKE_SUCCESS, payload: created });

    // Allow component to redirect / reset if it needs to
    onSuccess && onSuccess();
  } catch (err) {
    dispatch({ type: ADD_MAKE_FAIL, payload: err.message });
  }
};




// delete

export const deleteMake = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://replete-software.com/projects/rathi/api/deletemake/${id}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) throw new Error("Failed to delete make");

    dispatch({ type: DELETE_MAKE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_MAKE_FAIL, payload: err.message });
  }
};



// edit
export const updateMake = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_MAKE_REQUEST });

  try {
    const res = await fetch(`https://replete-software.com/projects/rathi/api/updatemake/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && (data.status === 1 || data.status === "success")) {
      dispatch({ type: UPDATE_MAKE_SUCCESS, payload: { id, updated: payload } });
      return { ok: true, message: data.message || "Make updated successfully!" };
    } else {
      dispatch({ type: UPDATE_MAKE_FAIL, payload: data.message || "Failed to update make" });
      return { ok: false, message: data.message || "Failed to update make" };
    }
  } catch (error) {
    dispatch({ type: UPDATE_MAKE_FAIL, payload: error.message });
    return { ok: false, message: error.message || "Network error." };
  }
};