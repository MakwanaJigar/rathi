export const FETCH_CHALLANS_REQUEST = "FETCH_CHALLANS_REQUEST";
export const FETCH_CHALLANS_SUCCESS = "FETCH_CHALLANS_SUCCESS";
export const FETCH_CHALLANS_FAIL = "FETCH_CHALLANS_FAIL";

export const fetchChallans = () => async (dispatch) => {
  dispatch({ type: FETCH_CHALLANS_REQUEST });

  try {
    const res = await fetch("https://replete-software.com/projects/rathi/api/listing-delivery-challan/");
    const data = await res.json();

    dispatch({
      type: FETCH_CHALLANS_SUCCESS,
      payload: Array.isArray(data) ? data : (data.data || []),
    });
  } catch (err) {
    dispatch({
      type: FETCH_CHALLANS_FAIL,
      payload: err.message || "Failed to fetch delivery challans.",
    });
  }
};
