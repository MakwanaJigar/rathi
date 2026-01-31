import axios from "axios";

export const WKUHA_REQUEST = "WKUHA_REQUEST";
export const WKUHA_SUCCESS = "WKUHA_SUCCESS";
export const WKUHA_FAIL = "WKUHA_FAIL";

export const fetchWKuha = () => async (dispatch) => {
  try {
    dispatch({ type: WKUHA_REQUEST });

    const { data } = await axios.get(
      "https://replete-software.com/projects/rathi/api/deliverychallan-items/filter?warehouse=W.Kuha"
    );

    dispatch({
      type: WKUHA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WKUHA_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
