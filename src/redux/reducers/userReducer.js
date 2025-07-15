// reducer.js
import {
    FETCH_USERS_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "../actions/userActions";

const initialState = {
    users: [],
    deletingId: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload };
        case DELETE_USER_REQUEST:
            return { ...state, deletingId: action.payload, error: null };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                deletingId: null,
                users: state.users.filter((u) => u.id !== action.payload),
            };

        case DELETE_USER_FAIL:
            return { ...state, deletingId: null, error: action.payload };

        default:
            return state;
    }
};

export default userReducer;
