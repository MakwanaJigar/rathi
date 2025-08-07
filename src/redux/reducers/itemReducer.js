import {
  FETCH_ITEMS_SUCCESS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  EXPORT_ITEMS_REQUEST,
  EXPORT_ITEMS_SUCCESS,
  EXPORT_ITEMS_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  IMPORT_ITEMS_REQUEST,
  IMPORT_ITEMS_SUCCESS,
  IMPORT_ITEMS_FAILURE,
} from "../actions/itemActions";

const initialState = {
  items: [],
  adding: false,
  addError: null,
  // export‑items state
  exporting: false,
  exportError: null,

   updating: false,
  updateError: null,

  items: [],
  importing: false,
  importError: null,

};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return { ...state, items: action.payload };

    case ADD_ITEM_REQUEST:
      return { ...state, adding: true, addError: null };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        adding: false,
        items: [...state.items, action.payload],
      };

    case ADD_ITEM_FAIL:
      return { ...state, adding: false, addError: action.payload };

    // -------- export‑items ----------
    case EXPORT_ITEMS_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_ITEMS_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_ITEMS_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case DELETE_ITEM_FAIL:
      return {
        ...state,
        // optionally handle delete error here
      };

      case UPDATE_ITEM_REQUEST:
  return { ...state, updating: true, updateError: null };

case UPDATE_ITEM_SUCCESS:
  return {
    ...state,
    updating: false,
    items: state.items.map(item =>
      item.id === action.payload.id ? { ...item, ...action.payload.updated } : item
    ),
  };

case UPDATE_ITEM_FAIL:
  return { ...state, updating: false, updateError: action.payload };


  // import
  case IMPORT_ITEMS_REQUEST:
      return { ...state, importing: true, importError: null };
    case IMPORT_ITEMS_SUCCESS:
      return {
        ...state,
        importing: false,
        items: action.payload, // Adjust depending on response format
      };
    case IMPORT_ITEMS_FAILURE:
      return { ...state, importing: false, importError: action.payload };

    default:
      return state;
  }
};

export default itemReducer;
