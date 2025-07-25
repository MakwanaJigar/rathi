import {
    FETCH_USERS_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    RESET_CREATE_USER,
    UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESET_UPDATE_USER,
} from "../actions/userActions";

const initialState = {
    users: [],
    deletingId: null,
    deleteError: null,
    error: null,
    creating: false,
    createSuccess: false,
    updating: false,
  updateSuccess: false,
  updateError: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload };

        case DELETE_USER_REQUEST:
            return { ...state, deletingId: action.payload, deleteError: null };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((u) => u.id !== action.payload),
                deletingId: null,
            };

        case DELETE_USER_FAIL:
            return {
                ...state,
                deletingId: null,
                deleteError: action.payload,
            };

        case ADD_USER_REQUEST:
            return { ...state, creating: true, createSuccess: false, error: null };

        case ADD_USER_SUCCESS:
            return {
                ...state,
                creating: false,
                createSuccess: true,
            };

        case ADD_USER_FAIL:
            return { ...state, creating: false, createSuccess: false, error: action.payload };

        case RESET_CREATE_USER:
            return { ...state, createSuccess: false };

        case UPDATE_USER_REQUEST:
      return { ...state, updating: true, updateSuccess: false, updateError: null };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload.updated } : user
        ),
      };

    case UPDATE_USER_FAIL:
      return { ...state, updating: false, updateSuccess: false, updateError: action.payload };

    case RESET_UPDATE_USER:
      return { ...state, updateSuccess: false, updateError: null };


        default:
            return state;
    }
};

export default userReducer;
