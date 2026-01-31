
// import axios from 'axios';

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// export const LOGOUT = 'LOGOUT';

// export const loginUser = (credentials) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   try {
//     const response = await axios.post('https://replete-software.com/projects/rathi/admin/login', credentials);
    
//     const { token, user } = response.data;
//     localStorage.setItem('authToken', token);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: { token, user },
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload: error.response?.data?.message || 'Login failed',
//     });
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('authToken');
//   return { type: LOGOUT };
// };



import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

/* ================= LOGIN ================= */

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(
      'https://replete-software.com/projects/rathi/api/user/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response?.data?.message ||
        'Login failed',
    });
  }
};

/* ================= LOGOUT ================= */

export const logoutUser = () => async (dispatch, getState) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    const token = getState().auth.token;

    await axios.post(
      'https://replete-software.com/projects/rathi/api/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    // Even if API fails, force logout
    dispatch({ type: LOGOUT_FAILURE });
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }
};





// import axios from 'axios';

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// export const LOGOUT = 'LOGOUT';

// export const loginUser = ({ email, password }) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   try {
//     const response = await axios.post(
//       'https://replete-software.com/projects/rathi/api/user/login',
//       {
//         email,
//         password,
//       },
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );

//     const { token, user } = response.data;

//     if (!token) {
//       throw new Error('Invalid credentials');
//     }

//     localStorage.setItem('authToken', token);
//     localStorage.setItem('authUser', JSON.stringify(user));

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: { token, user },
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload:
//         error.response?.data?.message ||
//         Object.values(error.response?.data?.errors || {})[0]?.[0] ||
//         'Login failed',
//     });
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('authUser');
//   return { type: LOGOUT };
// };

