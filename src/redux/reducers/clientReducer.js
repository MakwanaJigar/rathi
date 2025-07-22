import {
  FETCH_CLIENT_SUCCESS,
  EXPORT_CLIENT_REQUEST,
  EXPORT_CLIENT_SUCCESS,
  EXPORT_CLIENT_FAIL,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILURE,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL
} from '../actions/clientActions';


const initialState = {
  clients: [],
  // export‑client state
  exporting: false,
  exportError: null,

  adding: false,
  addError: null,
  addSuccess: false, // 👈 Add this
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_SUCCESS:
      return { ...state, clients: action.payload };

      // Add client
    case ADD_CLIENT_REQUEST:
      return { ...state, adding: true, addError: null, addSuccess: false };

    case ADD_CLIENT_SUCCESS:
      return { ...state, adding: false, addSuccess: true };

    case ADD_CLIENT_FAILURE:
      return { ...state, adding: false, addError: action.payload, addSuccess: false };

    // -------- export‑items ----------
    case EXPORT_CLIENT_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_CLIENT_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_CLIENT_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

      case DELETE_CLIENT_SUCCESS:
  return {
    ...state,
    clients: state.clients.filter((client) => client.id !== action.payload),
};

case DELETE_CLIENT_FAIL:
  return {
    ...state,
    // You can add error UI logic here if needed
};

    default:
      return state;
  }
};

export default clientReducer;


