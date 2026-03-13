import { saveAs } from "file-saver";
import axios from "axios";

export const FETCH_WAREHOUSE_SUCCESS = "FETCH_WAREHOUSE_SUCCESS";

export const EXPORT_WAREHOUSE_REQUEST = "EXPORT_WAREHOUSE_REQUEST";
export const EXPORT_WAREHOUSE_SUCCESS = "EXPORT_WAREHOUSE_SUCCESS";
export const EXPORT_WAREHOUSE_FAIL = "EXPORT_WAREHOUSE_FAIL";

export const ADD_WAREHOUSE_REQUEST = "ADD_WAREHOUSE_REQUEST";
export const ADD_WAREHOUSE_SUCCESS = "ADD_WAREHOUSE_SUCCESS";
export const ADD_WAREHOUSE_FAIL = "ADD_WAREHOUSE_FAIL";

export const UPDATE_WAREHOUSE_REQUEST = "UPDATE_WAREHOUSE_REQUEST";
export const UPDATE_WAREHOUSE_SUCCESS = "UPDATE_WAREHOUSE_SUCCESS";
export const UPDATE_WAREHOUSE_FAIL = "UPDATE_WAREHOUSE_FAIL";

export const DELETE_WAREHOUSE_SUCCESS = "DELETE_WAREHOUSE_SUCCESS";
export const DELETE_WAREHOUSE_FAIL = "DELETE_WAREHOUSE_FAIL";

export const IMPORT_WAREHOUSE_REQUEST = "IMPORT_WAREHOUSE_REQUEST";
export const IMPORT_WAREHOUSE_SUCCESS = "IMPORT_WAREHOUSE_SUCCESS";
export const IMPORT_WAREHOUSE_FAILURE = "IMPORT_WAREHOUSE_FAILURE";

export const fetchWarehouses = () => {
  return async (dispatch) => {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/warehouse-list",
    );
    const data = await res.json();
    dispatch({ type: FETCH_WAREHOUSE_SUCCESS, payload: data });
  };
};

// GET  export‑items  ➜ download CSV to the user’s machine
export const exportWarehouse = () => async (dispatch) => {
  dispatch({ type: EXPORT_WAREHOUSE_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/export-warehouse",
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob(); // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `Warehouse_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_WAREHOUSE_SUCCESS });
  } catch (err) {
    dispatch({
      type: EXPORT_WAREHOUSE_FAIL,
      payload: err.message || "Export failed",
    });
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
      },
    );

    const data = await res.json();

    // Flexible success detection: if response.ok and no error indicators
    const isError =
      data?.error === true ||
      data?.error === "true" ||
      (typeof data?.message === "string" &&
        data.message.toLowerCase().includes("error")) ||
      data?.status === 0 ||
      data?.status === "error";

    if (res.ok && !isError) {
      dispatch({ type: ADD_WAREHOUSE_SUCCESS });
      return {
        ok: true,
        message: data?.message || "Warehouse added successfully!",
      };
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
      },
    );

    if (!res.ok) throw new Error("Failed to delete warehouse");

    dispatch({ type: DELETE_WAREHOUSE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_WAREHOUSE_FAIL, payload: err.message });
  }
};

// edit
// export const updateWarehouse = (id, payload) => async (dispatch) => {
//   dispatch({ type: UPDATE_WAREHOUSE_REQUEST });

//   try {
//     console.log('=== WAREHOUSE UPDATE START ===');
//     console.log('Warehouse ID:', id);
//     console.log('Sending Payload:', payload);
    
//     const res = await fetch(
//       `https://replete-software.com/projects/rathi/api/updatewarehouse/${id}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...payload,
//           id: parseInt(id),
//           warehouse_id: parseInt(id),
//         }),
//       }
//     );

//     console.log('HTTP Status:', res.status);
//     const data = await res.json();
//     console.log('Full API Response:', data);
    
//     const isError =
//       data?.error === true ||
//       data?.error === "true" ||
//       (typeof data?.message === "string" &&
//         data.message.toLowerCase().includes("error")) ||
//       data?.status === 0 ||
//       data?.status === "error";

//     if (res.ok && !isError) {
//       console.log('✓ UPDATE SUCCESS - HTTP 200');
//       dispatch({
//         type: UPDATE_WAREHOUSE_SUCCESS,
//         payload: {
//           id: parseInt(id),
//           updated: {
//             warehouse_name: payload.warehouse_name,
//             warehouse_address: payload.warehouse_address,
//           },
//         },
//       });

//       return { ok: true, message: data?.message || "Warehouse updated successfully!" };
//     }

//     console.log('✗ UPDATE FAILED');
//     const errorMsg =
//       data?.message ||
//       (typeof data === 'string' ? data : JSON.stringify(data));
//     dispatch({ type: UPDATE_WAREHOUSE_FAIL, payload: errorMsg });
//     return { ok: false, message: errorMsg };

//   } catch (err) {
//     console.error('CATCH ERROR:', err.message);
//     dispatch({ type: UPDATE_WAREHOUSE_FAIL, payload: err.message });
//     return { ok: false, message: err.message };
//   }
// };

// ✅ UPDATE (FIXED)
export const updateWarehouse = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_WAREHOUSE_REQUEST });

  try {
    const res = await fetch(
      `https://replete-software.com/projects/rathi/api/updatewarehouse/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.warehouse_name,              // ⭐ IMPORTANT FIX
          warehouse_address: payload.warehouse_address,
          id: id,
        }),
      }
    );

    const data = await res.json();
    console.log("UPDATE RESPONSE:", data);

    if (res.ok) {
      dispatch({
        type: UPDATE_WAREHOUSE_SUCCESS,
        payload: { id: id, updated: payload },
      });

      return { ok: true, message: data.message || "Updated successfully" };
    } else {
      dispatch({ type: UPDATE_WAREHOUSE_FAIL, payload: data.message });
      return { ok: false, message: data.message };
    }
  } catch (err) {
    dispatch({ type: UPDATE_WAREHOUSE_FAIL, payload: err.message });
    return { ok: false, message: err.message };
  }
};



// import
export const importWarehouse = (formData) => async (dispatch) => {
  dispatch({ type: IMPORT_WAREHOUSE_REQUEST });

  try {
    const response = await axios.post(
      "https://replete-software.com/projects/rathi/api/import-warehouse",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    dispatch({ type: IMPORT_WAREHOUSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: IMPORT_WAREHOUSE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
