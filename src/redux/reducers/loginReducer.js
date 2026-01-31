// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT,
// } from '../actions/loginAction';

// const initialState = {
//   loading: false,
//   user: JSON.parse(localStorage.getItem('authUser')) || null,
//   token: localStorage.getItem('authToken') || null,
//   isAuthenticated: !!localStorage.getItem('authToken'),
//   permissions: [],
//   error: null,
// };

// const authReducer = (state = initialState, action = {}) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case LOGIN_SUCCESS: {
//       const { user, token } = action.payload;

//       return {
//         ...state,
//         loading: false,
//         user,
//         token,
//         permissions: user?.access_control ? [user.access_control] : [],
//         isAuthenticated: true,
//         error: null,
//       };
//     }

//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case LOGOUT:
//       return {
//         ...initialState,
//         user: null,
//         token: null,
//         isAuthenticated: false,
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;




import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/loginAction';

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  permissions: [],
  error: null,
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        permissions: action.payload.user?.access_control
          ? [action.payload.user.access_control]
          : [],
        isAuthenticated: true,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return {
        ...initialState,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
