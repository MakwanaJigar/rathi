export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAIL = "ADD_USER_FAIL";
export const RESET_CREATE_USER = "RESET_CREATE_USER";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const RESET_UPDATE_USER = "RESET_UPDATE_USER";





// Fetch users
export const fetchUsers = () => async (dispatch) => {
  const res = await fetch("https://replete-software.com/projects/rathi/api/user-list");
  const data = await res.json();

  let items = [];
  if (Array.isArray(data)) items = data;
  else if (Array.isArray(data.data)) items = data.data;
  else if (Array.isArray(data.items)) items = data.items;

  dispatch({ type: FETCH_USERS_SUCCESS, payload: items });
};

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST, payload: id });

    const res = await fetch(`https://replete-software.com/projects/rathi/api/delete-user/${id}`, {
      method: "POST", // 🔁 switched from DELETE to POST
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_USER_FAIL, payload: err.message });
  }
};


// Add user
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });

    const res = await fetch("https://replete-software.com/projects/rathi/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to create user");

    dispatch({ type: ADD_USER_SUCCESS, payload: result });

    dispatch(fetchUsers());
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error.message });
  }
};

// Reset create success
export const resetCreateUser = () => ({

  type: RESET_CREATE_USER,
});





// edit
export const updateUser = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const res = await fetch(`https://replete-software.com/projects/rathi/api/update-user/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const isSuccess =
      res.ok ||
      data?.status === 1 ||
      data?.status === "success" ||
      data?.message?.toLowerCase()?.includes("success");

    if (isSuccess) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { id, updated: payload } });
      return { ok: true, message: data?.message || "User updated successfully!" };
    } else {
      const errorMsg = data?.message || "Failed to update user.";
      dispatch({ type: UPDATE_USER_FAIL, payload: errorMsg });
      return { ok: false, message: errorMsg };
    }
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAIL, payload: err.message });
    return { ok: false, message: err.message || "Network error." };
  }
};

// Reset create success
// export const resetCreateUser = () => ({
//   type: RESET_CREATE_USER,
// });

// Reset update success and error
export const resetUpdateUser = () => ({
  type: RESET_UPDATE_USER,
});