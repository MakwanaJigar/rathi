// reducer.js
import {
  FETCH_MAKES_SUCCESS,
  EXPORT_MAKES_REQUEST,
  EXPORT_MAKES_SUCCESS,
  EXPORT_MAKES_FAIL,
  ADD_MAKE_REQUEST,
  ADD_MAKE_SUCCESS,
  ADD_MAKE_FAIL,
  DELETE_MAKE_SUCCESS,
  DELETE_MAKE_FAIL,
  UPDATE_MAKE_REQUEST,
  UPDATE_MAKE_SUCCESS,
  UPDATE_MAKE_FAIL,
} from "../actions/makeActions";

const initialState = {
  makes: [],

  // add‑make
  adding: false,
  addError: null,

  // export‑client state
  exporting: false,
  exportError: null,

  // edit
  updating: false,
  updateError: null,
};

const makeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAKES_SUCCESS:
      return { ...state, makes: action.payload };

    /* ---------- ADD ---------- */
    case ADD_MAKE_REQUEST:
      return { ...state, adding: true, addError: null };

    case ADD_MAKE_SUCCESS:
      return {
        ...state,
        adding: false,
        makes: [action.payload, ...state.makes],   // prepend new record
      };

    case ADD_MAKE_FAIL:
      return { ...state, adding: false, addError: action.payload };

    // -------- export‑items ----------
    case EXPORT_MAKES_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_MAKES_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_MAKES_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    // delete

    case DELETE_MAKE_SUCCESS:
      return {
        ...state,
        makes: state.makes.filter((make) => make.id !== action.payload),
      };

    case DELETE_MAKE_FAIL:
      return {
        ...state,
        // Optionally handle error UI
      };

    // edit
    case UPDATE_MAKE_REQUEST:
      return { ...state, updating: true, updateError: null };

    case UPDATE_MAKE_SUCCESS:
      return {
        ...state,
        updating: false,
        makes: state.makes.map((make) =>
          make.id === action.payload.id ? { ...make, ...action.payload.updated } : make
        ),
      };

    case UPDATE_MAKE_FAIL:
      return { ...state, updating: false, updateError: action.payload };

    default:
      return state;
  }
};

export default makeReducer;


