// import axios from 'axios';

// export const submitChallanForm = (data) => async (dispatch) => {
//   dispatch({ type: 'CLIENT_FORM_REQUEST' });

//   try {
//     const response = await axios.post(
//       'https://replete-software.com/projects/rathi/api/add_client',
//       data
//     );

//     dispatch({ type: 'CLIENT_FORM_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({
//       type: 'CLIENT_FORM_FAILURE',
//       payload: error.response?.data?.message || 'Something went wrong',
//     });
//   }
// };
