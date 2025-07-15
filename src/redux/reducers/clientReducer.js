import { FETCH_CLIENT_SUCCESS, EXPORT_CLIENT_REQUEST, EXPORT_CLIENT_SUCCESS, EXPORT_CLIENT_FAIL } from '../actions/clientActions';

const initialState = {
  clients: [],
  // export‑client state
  exporting: false,
  exportError: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_SUCCESS:
      return { ...state, clients: action.payload };

    // -------- export‑items ----------
    case EXPORT_CLIENT_REQUEST:
      return { ...state, exporting: true, exportError: null };

    case EXPORT_CLIENT_SUCCESS:
      return { ...state, exporting: false };

    case EXPORT_CLIENT_FAIL:
      return { ...state, exporting: false, exportError: action.payload };

    default:
      return state;
  }
};

export default clientReducer;
