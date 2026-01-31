import axios from "axios";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: PROFILE_REQUEST });

  try {
    const token = getState().auth.token;

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      "https://replete-software.com/projects/rathi/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: PROFILE_SUCCESS,
      payload:
        response.data.data ||
        response.data.user ||
        response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to load profile",
    });
  }
};
