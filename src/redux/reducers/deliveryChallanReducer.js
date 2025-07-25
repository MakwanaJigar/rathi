import {
  FETCH_CHALLANS_REQUEST,
  FETCH_CHALLANS_SUCCESS,
  FETCH_CHALLANS_FAIL,
} from "../actions/deliveryChallanActions";

const initialState = {
  loading: false,
  challans: [],
  error: null,
};

const deliveryChallanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHALLANS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CHALLANS_SUCCESS:
      return { ...state, loading: false, challans: action.payload };

    case FETCH_CHALLANS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default deliveryChallanReducer;
