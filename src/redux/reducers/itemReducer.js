import {
  FETCH_ITEMS_SUCCESS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  EXPORT_ITEMS_REQUEST,
  EXPORT_ITEMS_SUCCESS,
  EXPORT_ITEMS_FAIL,
} from "../actions/itemActions";

const initialState = {
  items: [],
  adding: false,
  addError: null,
  // export‑items state
  exporting: false,
  exportError: null,
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

    default:
      return state;
  }
};

export default itemReducer;
