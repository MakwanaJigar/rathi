// src/actions/authActions.js
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post('https://replete-software.com/projects/rathi/admin/login', credentials);
    
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed',
    });
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  return { type: LOGOUT };
};
