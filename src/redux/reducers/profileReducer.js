import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../actions/profileAction";

const initialState = {
  loading: false,
  profile: {},
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: null,
      };

    case PROFILE_FAILURE:
      return {
        loading: false,
        profile: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
