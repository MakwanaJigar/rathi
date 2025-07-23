import {
  FETCH_SALES_REPS_SUCCESS,
  ADD_SALES_REP_REQUEST,
  ADD_SALES_REP_SUCCESS,
  ADD_SALES_REP_FAIL,
  EXPORT_SALES_REP_REQUEST,
  EXPORT_SALES_REP_SUCCESS,
  EXPORT_SALES_REP_FAIL,
  DELETE_REP_SUCCESS,
  DELETE_REP_FAIL,
  UPDATE_SALES_REP_REQUEST,
  UPDATE_SALES_REP_SUCCESS,
  UPDATE_SALES_REP_FAIL,
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

  updating: false,
  updateError: null,
};

const salesRepReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALES_REPS_SUCCESS:
      return { ...state, representatives: action.payload };
    /* add */
    case ADD_SALES_REP_REQUEST:
      return { ...state, adding: true, addError: null };
    case ADD_SALES_REP_SUCCESS:
      return { ...state, adding: false };
    case ADD_SALES_REP_FAIL:
      return { ...state, adding: false, addError: action.payload };


    // -------- export‑items ----------
    case EXPORT_SALES_REP_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_SALES_REP_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_SALES_REP_FAIL:
      return { ...state, exporting: false, exportError: action.payload };


    // delete

    case DELETE_REP_SUCCESS:
      return {
        ...state,
        representatives: state.representatives.filter((r) => r.id !== action.payload),
      };


    case DELETE_REP_FAIL:
      return {
        ...state,
      };

    // edit
    case UPDATE_SALES_REP_REQUEST:
      return { ...state, updating: true, updateError: null };

    case UPDATE_SALES_REP_SUCCESS:
      return {
        ...state,
        updating: false,
        representatives: state.representatives.map((rep) =>
          rep.id === parseInt(action.payload.id)
            ? { ...rep, ...action.payload.updated }
            : rep
        ),
      };

    case UPDATE_SALES_REP_FAIL:
      return { ...state, updating: false, updateError: action.payload };

    default:
      return state;
  }
};

export default salesRepReducer;
