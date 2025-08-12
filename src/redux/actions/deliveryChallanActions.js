import { saveAs } from "file-saver";


export const FETCH_CHALLANS_REQUEST = "FETCH_CHALLANS_REQUEST";
export const FETCH_CHALLANS_SUCCESS = "FETCH_CHALLANS_SUCCESS";
export const FETCH_CHALLANS_FAIL = "FETCH_CHALLANS_FAIL";

export const DELETE_CHALLAN_REQUEST = 'DELETE_CHALLAN_REQUEST';
export const DELETE_CHALLAN_SUCCESS = 'DELETE_CHALLAN_SUCCESS';
export const DELETE_CHALLAN_FAIL = 'DELETE_CHALLAN_FAIL';

export const ADD_DELIVERY_CHALLAN_REQUEST = "ADD_DELIVERY_CHALLAN_REQUEST";
export const ADD_DELIVERY_CHALLAN_SUCCESS = "ADD_DELIVERY_CHALLAN_SUCCESS";
export const ADD_DELIVERY_CHALLAN_FAILURE = "ADD_DELIVERY_CHALLAN_FAILURE";



export const EXPORT_CHALLAN_REQUEST = 'EXPORT_CHALLAN_REQUEST';
export const EXPORT_CHALLAN_SUCCESS = 'EXPORT_CHALLAN_SUCCESS';
export const EXPORT_CHALLAN_FAIL = 'EXPORT_CHALLAN_FAIL';






// get
export const fetchChallans = () => async (dispatch) => {
  dispatch({ type: FETCH_CHALLANS_REQUEST });

  try {
    const res = await fetch("https://replete-software.com/projects/rathi/api/listing-delivery-challan/");
    const data = await res.json();

    dispatch({
      type: FETCH_CHALLANS_SUCCESS,
      payload: Array.isArray(data) ? data : (data.data || []),
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
        method: 'POST',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete challan: ${errorText}`);
    }

    const result = await response.json();

    if (result?.result?.toLowerCase().includes('success')) {
      dispatch({ type: DELETE_CHALLAN_SUCCESS, payload: id });
    } else {
      throw new Error(result?.result || 'Unknown error occurred.');
    }
  } catch (error) {
    dispatch({ type: DELETE_CHALLAN_FAIL, payload: error.message });
  }
};





// add
export const addDeliveryChallan = (data) => async (dispatch) => {
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }

    const result = await response.json();

    const success =
      result?.success === true ||
      (typeof result?.result === "string" &&
        result.result.toLowerCase().includes("success"));

    if (success) {
      dispatch({ type: ADD_DELIVERY_CHALLAN_SUCCESS, payload: result.data || data });
    } else {
      throw new Error(result?.message || result?.result || "Failed to add delivery challan.");
    }

    return { success, ...result };
  } catch (error) {
    dispatch({ type: ADD_DELIVERY_CHALLAN_FAILURE, payload: error.message });
    return { success: false, message: error.message };
  }
};










// Export Delivery Challan CSV
export const exportChallans = () => async (dispatch) => {
  dispatch({ type: EXPORT_CHALLAN_REQUEST });

  try {
    const response = await fetch(
      "https://replete-software.com/projects/rathi/api/delivery-challan/export/csv"
    );

    if (!response.ok) throw new Error("Export failed.");

    const blob = await response.blob();
    const fileName = `delivery_challans_${new Date().toISOString().slice(0, 10)}.csv`;

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
  if (!challans || !Array.isArray(challans)) return 'RI-01';

  const numbers = challans
    .map((c) => {
      const match = c.do_number?.match(/^RI-(\d+)$/); // Assumes challan.do_number format is "RI-01"
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((n) => n !== null);

  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  const next = (max + 1).toString().padStart(2, '0');
  return `RI-${next}`;
}
