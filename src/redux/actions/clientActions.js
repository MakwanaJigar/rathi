import { saveAs } from "file-saver"; 


export const FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS';
export const EXPORT_CLIENT_REQUEST    =  "EXPORT_CLIENT_REQUEST";
export const EXPORT_CLIENT_SUCCESS    =  "EXPORT_CLIENT_SUCCESS";
export const EXPORT_CLIENT_FAIL       =  "EXPORT_CLIENT_FAIL";
export const ADD_CLIENT_REQUEST = 'ADD_CLIENT_REQUEST';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE';

export const fetchClients = () => {
  return async (dispatch) => {
    const res = await fetch('https://replete-software.com/projects/rathi/api/client-list');
    const data = await res.json();

    // Try to extract the array properly
    let clients = [];
    if (Array.isArray(data)) {
      clients = data;
    } else if (Array.isArray(data.data)) {
      clients = data.data;
    } else if (Array.isArray(data.clients)) {
      clients = data.clients;
    } else {
      console.warn("Unexpected client data format", data);
    }

    dispatch({ type: FETCH_CLIENT_SUCCESS, payload: clients });
  };
};







// GET  export‑items  ➜ download CSV to the user’s machine
export const exportClients = () => async dispatch => {
  dispatch({ type: EXPORT_CLIENT_REQUEST });

  try {
    const res = await fetch(
      "https://replete-software.com/projects/rathi/api/clients/export/csv"
    );
    if (!res.ok) throw new Error("Export failed.");

    const blob = await res.blob();               // CSV as binary

    // Use file‑saver for the download (handles all browsers incl. Edge)
    const fileName = `clients_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);

    dispatch({ type: EXPORT_CLIENT_SUCCESS });
  } catch (err) {
    dispatch({ type: EXPORT_CLIENT_FAIL, payload: err.message || "Export failed" });
  }
};




// add client

export const addClient = (data) => async (dispatch) => {
  dispatch({ type: ADD_CLIENT_REQUEST });
  try {
    const response = await fetch('https://replete-software.com/projects/rathi/api/add_client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Server responded with error: ${errText}`);
    }

    const result = await response.json();
    dispatch({ type: ADD_CLIENT_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: ADD_CLIENT_FAILURE, payload: error.message });
  }
};