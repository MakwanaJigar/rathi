import {
  FETCH_CHALLANS_REQUEST,
  FETCH_CHALLANS_SUCCESS,
  FETCH_CHALLANS_FAIL,
  ADD_DELIVERY_CHALLAN_REQUEST,
  ADD_DELIVERY_CHALLAN_SUCCESS,
  ADD_DELIVERY_CHALLAN_FAILURE,
  DELETE_CHALLAN_FAIL,
  DELETE_CHALLAN_SUCCESS,
  EXPORT_CHALLAN_FAIL,
  EXPORT_CHALLAN_SUCCESS,
  EXPORT_CHALLAN_REQUEST,
   UPDATE_DELIVERY_CHALLAN_REQUEST,
  UPDATE_DELIVERY_CHALLAN_SUCCESS,
  UPDATE_DELIVERY_CHALLAN_FAILURE,
} from "../actions/deliveryChallanActions";

const initialState = {
  challans: [],
  loading: false,
  success: false,
  error: null,
  challan: null,
  // add
  adding: false,
  addSuccess: false,
  addError: null,
};

const deliveryChallanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHALLANS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CHALLANS_SUCCESS:
      return { ...state, loading: false, challans: action.payload };

    case FETCH_CHALLANS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // -------------------- ADD --------------------
    case ADD_DELIVERY_CHALLAN_REQUEST:
      return { ...state, adding: true, addError: null, addSuccess: false };

    case ADD_DELIVERY_CHALLAN_SUCCESS:
      return {
        ...state,
        adding: false,
        addSuccess: true,
        challans: [...state.challans, action.payload], // append new challan
      };

    case ADD_DELIVERY_CHALLAN_FAILURE:
      return { ...state, adding: false, addError: action.payload, addSuccess: false };

    // delete
    case DELETE_CHALLAN_SUCCESS:
      return {
        ...state,
        challans: state.challans.filter(
          (challan) => challan.id !== action.payload
        ),
      };
    case DELETE_CHALLAN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // export
    case EXPORT_CHALLAN_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_CHALLAN_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_CHALLAN_FAIL:
      return { ...state, exporting: false, exportError: action.payload };


      // edit

       case UPDATE_DELIVERY_CHALLAN_REQUEST:
      return { ...state, updating: true, updateError: null, updateSuccess: false };

    case UPDATE_DELIVERY_CHALLAN_SUCCESS:
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        challans: state.challans.map((challan) =>
          challan.id === action.payload.id
            ? { ...challan, ...action.payload.updatedData }
            : challan
        ),
      };

    case UPDATE_DELIVERY_CHALLAN_FAILURE:
      return { ...state, updating: false, updateError: action.payload, updateSuccess: false };

    default:
      return state;
  }
};

export default deliveryChallanReducer;
