import {
  WKUHA_REQUEST,
  WKUHA_SUCCESS,
  WKUHA_FAIL,
} from "../../redux/actions/kuhaAction";  

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const wkuhaReducer = (state = initialState, action) => {
  switch (action.type) {
    case WKUHA_REQUEST:
      return { ...state, loading: true };

    case WKUHA_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case WKUHA_FAIL:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export default wkuhaReducer;
