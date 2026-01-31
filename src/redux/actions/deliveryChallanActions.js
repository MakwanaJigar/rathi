import { saveAs } from "file-saver";

export const FETCH_CHALLANS_REQUEST = "FETCH_CHALLANS_REQUEST";
export const FETCH_CHALLANS_SUCCESS = "FETCH_CHALLANS_SUCCESS";
export const FETCH_CHALLANS_FAIL = "FETCH_CHALLANS_FAIL";

export const DELETE_CHALLAN_REQUEST = "DELETE_CHALLAN_REQUEST";
export const DELETE_CHALLAN_SUCCESS = "DELETE_CHALLAN_SUCCESS";
export const DELETE_CHALLAN_FAIL = "DELETE_CHALLAN_FAIL";

export const ADD_DELIVERY_CHALLAN_REQUEST = "ADD_DELIVERY_CHALLAN_REQUEST";
export const ADD_DELIVERY_CHALLAN_SUCCESS = "ADD_DELIVERY_CHALLAN_SUCCESS";
export const ADD_DELIVERY_CHALLAN_FAILURE = "ADD_DELIVERY_CHALLAN_FAILURE";

export const UPDATE_DELIVERY_CHALLAN_REQUEST =
  "UPDATE_DELIVERY_CHALLAN_REQUEST";
export const UPDATE_DELIVERY_CHALLAN_SUCCESS =
  "UPDATE_DELIVERY_CHALLAN_SUCCESS";
export const UPDATE_DELIVERY_CHALLAN_FAILURE =
  "UPDATE_DELIVERY_CHALLAN_FAILURE";

export const EXPORT_CHALLAN_REQUEST = "EXPORT_CHALLAN_REQUEST";
export const EXPORT_CHALLAN_SUCCESS = "EXPORT_CHALLAN_SUCCESS";
export const EXPORT_CHALLAN_FAIL = "EXPORT_CHALLAN_FAIL";

export const RESET_DELIVERY_CHALLAN_STATE = "RESET_DELIVERY_CHALLAN_STATE";
export const CLEAR_UPDATE_SUCCESS = "CLEAR_UPDATE_SUCCESS";
export const CLEAR_UPDATE_ERROR = "CLEAR_UPDATE_ERROR";
export const CLEAR_ADD_SUCCESS = "CLEAR_ADD_SUCCESS";
export const CLEAR_ADD_ERROR = "CLEAR_ADD_ERROR";

// get
export const fetchChallans = () => async (dispatch) => {
  dispatch({ type: FETCH_CHALLANS_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/listing-delivery-challan/",
    );
    const data = await res.json();

    dispatch({
      type: FETCH_CHALLANS_SUCCESS,
      payload: Array.isArray(data) ? data : data.data || [],
    });
  } catch (err) {
    dispatch({
      type: FETCH_CHALLANS_FAIL,
      payload: err.message || "Failed to fetch delivery challans.",
    });
  }
};

// delete
export const deleteChallan = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CHALLAN_REQUEST });

  try {
    const response = await fetch(
      `https://replete-software.com/projects/rathi/api/delete-delivery-challan/${id}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete challan: ${errorText}`);
    }

    const result = await response.json();

    if (result?.result?.toLowerCase().includes("success")) {
      dispatch({ type: DELETE_CHALLAN_SUCCESS, payload: id });
    } else {
      throw new Error(result?.result || "Unknown error occurred.");
    }
  } catch (error) {
    dispatch({ type: DELETE_CHALLAN_FAIL, payload: error.message });
  }
};

// add
export const addDeliveryChallan = (data, onSuccess, onError) => async (dispatch) => {
  dispatch({ type: ADD_DELIVERY_CHALLAN_REQUEST });

  try {
    const formData = new FormData();

    // Append top-level fields
    Object.keys(data).forEach((key) => {
      if (key !== "items") {
        formData.append(key, data[key] ?? "");
      }
    });

    // Append items in Laravel-friendly format: items[0][field]
    data.items.forEach((item, index) => {
      Object.keys(item).forEach((field) => {
        formData.append(`items[${index}][${field}]`, item[field] ?? "");
      });
    });

    const response = await fetch(
      "https://replete-software.com/projects/rathi/api/add-delivery-challan",
      {
        method: "POST",
        body: formData, // no Content-Type header — browser sets it
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }

    const result = await response.json();

    // Simple and reliable success detection:
    // If response.ok is true and we got here without error, assume success
    // Only treat as error if we explicitly see error indicators
    const isError =
      result?.error === true ||
      result?.success === false ||
      (typeof result?.message === "string" && result.message.toLowerCase().includes("error")) ||
      (typeof result?.result === "string" && result.result.toLowerCase().includes("error"));

    if (!isError) {
      // If not explicitly an error, treat as success
      dispatch({
        type: ADD_DELIVERY_CHALLAN_SUCCESS,
        payload: result.data || data,
      });
      // Call the success callback if provided
      if (typeof onSuccess === "function") {
        onSuccess(result);
      }
      return { success: true, ...result };
    } else {
      throw new Error(
        result?.message || result?.result || "Failed to add delivery challan.",
      );
    }
  } catch (error) {
    dispatch({ type: ADD_DELIVERY_CHALLAN_FAILURE, payload: error.message });
    // Call the error callback if provided
    if (typeof onError === "function") {
      onError(error.message);
    }
    return { success: false, message: error.message };
  }
};

// Export Delivery Challan CSV
export const exportChallans = () => async (dispatch) => {
  dispatch({ type: EXPORT_CHALLAN_REQUEST });

  try {
    const response = await fetch(
      "https://replete-software.com/projects/rathi/api/delivery-challan/export/csv",
    );

    if (!response.ok) throw new Error("Export failed.");

    const blob = await response.blob();
    const fileName = `delivery_challans_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    saveAs(blob, fileName);

    dispatch({ type: EXPORT_CHALLAN_SUCCESS });
  } catch (error) {
    dispatch({
      type: EXPORT_CHALLAN_FAIL,
      payload: error.message || "Export failed.",
    });
  }
};

// .....D.O.NUMBER
export function getNextDONumber(challans) {
  if (!challans || !Array.isArray(challans)) return "RI-01";

  const numbers = challans
    .map((c) => {
      const match = c.do_number?.match(/^RI-(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((n) => n !== null);

  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  const next = (max + 1).toString().padStart(2, "0");
  return `RI-${next}`;
}

// EDIT

export const updateDeliveryChallan = (id, data, onSuccess, onError) => async (dispatch) => {
  dispatch({ type: UPDATE_DELIVERY_CHALLAN_REQUEST });

  try {
    const formData = new FormData();

    // Append top-level fields except items
    Object.keys(data).forEach((key) => {
      if (key !== "items") {
        formData.append(key, data[key] ?? "");
      }
    });

    // Append items in Laravel-friendly format
    data.items.forEach((item, index) => {
      Object.keys(item).forEach((field) => {
        formData.append(`items[${index}][${field}]`, item[field] ?? "");
      });
    });

    const response = await fetch(
      `https://replete-software.com/projects/rathi/api/update-delivery-challan/${id}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }

    const result = await response.json();

    // Simple and reliable success detection:
    // If response.ok is true and we got here without error, assume success
    // Only treat as error if we explicitly see error indicators
    const isError =
      result?.error === true ||
      result?.success === false ||
      (typeof result?.message === "string" && result.message.toLowerCase().includes("error")) ||
      (typeof result?.result === "string" && result.result.toLowerCase().includes("error"));

    if (!isError) {
      // If not explicitly an error, treat as success
      dispatch({
        type: UPDATE_DELIVERY_CHALLAN_SUCCESS,
        payload: { id, updatedData: result.data || data },
      });
      // Call the success callback if provided
      if (typeof onSuccess === "function") {
        onSuccess(result);
      }
      return { success: true, ...result };
    } else {
      throw new Error(result?.message || result?.result || "Failed to update challan.");
    }
  } catch (error) {
    dispatch({ type: UPDATE_DELIVERY_CHALLAN_FAILURE, payload: error.message });
    // Call the error callback if provided
    if (typeof onError === "function") {
      onError(error.message);
    }
    return { success: false, message: error.message };
  }
};

// Clear success/error states
export const clearUpdateSuccess = () => ({
  type: CLEAR_UPDATE_SUCCESS,
});

export const clearUpdateError = () => ({
  type: CLEAR_UPDATE_ERROR,
});

export const clearAddSuccess = () => ({
  type: CLEAR_ADD_SUCCESS,
});

export const clearAddError = () => ({
  type: CLEAR_ADD_ERROR,
});

export const resetDeliveryChallanState = () => ({
  type: RESET_DELIVERY_CHALLAN_STATE,
});
