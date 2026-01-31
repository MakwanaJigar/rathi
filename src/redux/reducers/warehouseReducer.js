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
  IMPORT_WAREHOUSE_REQUEST,
  IMPORT_WAREHOUSE_SUCCESS,
  IMPORT_WAREHOUSE_FAILURE,
} from '../actions/warehouseActions';

const initialState = {
  warehouses: [],
  adding: false,
  addError: null,
  exporting: false,
  exportError: null,
  updating: false,
  updateError: null,
  loading: false,
  error: null,
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WAREHOUSE_SUCCESS:
      console.log('✓ Reducer: FETCH_WAREHOUSE_SUCCESS - Received warehouses:', action.payload);
      return { ...state, warehouses: action.payload };

    case ADD_WAREHOUSE_REQUEST:
      return { ...state, adding: true, addError: null };

    case ADD_WAREHOUSE_SUCCESS:
      return { ...state, adding: false };

    case ADD_WAREHOUSE_FAIL:
      return { ...state, adding: false, addError: action.payload };

    case EXPORT_WAREHOUSE_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_WAREHOUSE_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_WAREHOUSE_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    case DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: state.warehouses.filter((w) => w.id !== action.payload),
      };

    case DELETE_WAREHOUSE_FAIL:
      return state;

    case UPDATE_WAREHOUSE_REQUEST:
      console.log('Reducer: UPDATE_WAREHOUSE_REQUEST');
      return { ...state, updating: true, updateError: null };

    case UPDATE_WAREHOUSE_SUCCESS:
      console.log('✓ Reducer: UPDATE_WAREHOUSE_SUCCESS');
      console.log('Current warehouses:', state.warehouses);
      console.log('Payload:', action.payload);
      const updated = state.warehouses.map((w) => {
        if (w.id === action.payload.id) {
          console.log('Found warehouse to update. Merging:', { ...w, ...action.payload.updated });
          return { ...w, ...action.payload.updated };
        }
        return w;
      });
      console.log('Updated warehouses list:', updated);
      return {
        ...state,
        updating: false,
        warehouses: updated,
      };

    case UPDATE_WAREHOUSE_FAIL:
      return { ...state, updating: false, updateError: action.payload };

    case IMPORT_WAREHOUSE_REQUEST:
      return { ...state, loading: true, error: null };

    case IMPORT_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouses: Array.isArray(action.payload)
          ? action.payload
          : state.warehouses,
      };

    case IMPORT_WAREHOUSE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default warehouseReducer;
