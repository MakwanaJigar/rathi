import {
  FETCH_WAREHOUSE_SUCCESS,
  EXPORT_WAREHOUSE_REQUEST,
  EXPORT_WAREHOUSE_SUCCESS,
  EXPORT_WAREHOUSE_FAIL,
  ADD_WAREHOUSE_REQUEST,
  ADD_WAREHOUSE_SUCCESS,
  ADD_WAREHOUSE_FAIL,
  DELETE_WAREHOUSE_SUCCESS,
  DELETE_WAREHOUSE_FAIL,
  UPDATE_WAREHOUSE_REQUEST,
  UPDATE_WAREHOUSE_SUCCESS,
  UPDATE_WAREHOUSE_FAIL,
} from '../actions/warehouseActions';

const initialState = {
  warehouses: [],

  /* add */
  adding: false,
  addError: null,

  // export‑client state
  exporting: false,
  exportError: null,

  // edit 
  updating: false,
  updateError: null,
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WAREHOUSE_SUCCESS:
      return { ...state, warehouses: action.payload };

    /* ---------- ADD ---------- */
    case ADD_WAREHOUSE_REQUEST:
      return { ...state, adding: true, addError: null };

    case ADD_WAREHOUSE_SUCCESS:
      return { ...state, adding: false };

    case ADD_WAREHOUSE_FAIL:
      return { ...state, adding: false, addError: action.payload };

    // -------- export‑items ----------
    case EXPORT_WAREHOUSE_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_WAREHOUSE_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_WAREHOUSE_FAIL:
      return { ...state, exporting: false, exportError: action.payload };


    // delete

    case DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: state.warehouses.filter((w) => w.id !== action.payload),
      };


    case DELETE_WAREHOUSE_FAIL:
      return {
        ...state,
        // Optionally handle error UI
      };


    // edit 
    case UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: state.warehouses.map((w) =>
          w.id === parseInt(action.payload.id)
            ? { ...w, ...action.payload.updated }
            : w
        ),
      };

    case UPDATE_WAREHOUSE_FAIL:
      return {
        ...state,
        // optionally store error
      };

    default:
      return state;
  }
};

export default warehouseReducer;
