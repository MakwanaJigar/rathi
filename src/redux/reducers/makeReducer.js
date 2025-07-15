// reducer.js
import {
  FETCH_MAKES_SUCCESS,
  EXPORT_MAKES_REQUEST,
  EXPORT_MAKES_SUCCESS,
  EXPORT_MAKES_FAIL,
} from "../actions/makeActions";

const initialState = {
  makes: [],
  // export‑client state
  exporting: false,
  exportError: null,
};

const makeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAKES_SUCCESS:
      return { ...state, makes: action.payload };

    // -------- export‑items ----------
    case EXPORT_MAKES_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_MAKES_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_MAKES_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    default:
      return state;
  }
};

export default makeReducer;


