import {
  FETCH_WAREHOUSE_SUCCESS,
  EXPORT_WAREHOUSE_REQUEST,
  EXPORT_WAREHOUSE_SUCCESS,
  EXPORT_WAREHOUSE_FAIL
} from '../actions/warehouseActions';

const initialState = {
  warehouses: [],
  // export‑client state
  exporting: false,
  exportError: null,
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WAREHOUSE_SUCCESS:
      return { ...state, warehouses: action.payload };

    // -------- export‑items ----------
    case EXPORT_WAREHOUSE_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_WAREHOUSE_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_WAREHOUSE_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    default:
      return state;
  }
};

export default warehouseReducer;
