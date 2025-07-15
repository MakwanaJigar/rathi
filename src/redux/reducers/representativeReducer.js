import {
  FETCH_SALES_REPS_SUCCESS,
  ADD_SALES_REP_REQUEST,
  ADD_SALES_REP_SUCCESS,
  ADD_SALES_REP_FAIL,
  EXPORT_SALES_REP_REQUEST,
  EXPORT_SALES_REP_SUCCESS,
  EXPORT_SALES_REP_FAIL
} from "../../redux/actions/representativeActions";

const initialState = {
  representatives: [],
  adding: false,
  addError: null,
  exporting: false,
  exportError: null,
  // export‑client state
  exporting: false,
  exportError: null,
};

const salesRepReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALES_REPS_SUCCESS:
      return { ...state, representatives: action.payload };
    case ADD_SALES_REP_REQUEST:
      return { ...state, adding: true, addError: null };

    case ADD_SALES_REP_SUCCESS:
      return {
        ...state,
        adding: false,
        representatives: [...state.representatives, action.payload],
      };

    case ADD_SALES_REP_FAIL:
      return { ...state, adding: false, addError: action.payload };


    // -------- export‑items ----------
    case EXPORT_SALES_REP_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_SALES_REP_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_SALES_REP_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    default:
      return state;
  }
};

export default salesRepReducer;
