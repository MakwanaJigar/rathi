export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";


export const fetchUsers = () => {
    return async (dispatch) => {
        const res = await fetch("https://replete-software.com/projects/rathi/api/user-list");
        const data = await res.json();

        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.data)) items = data.data;
        else if (Array.isArray(data.items)) items = data.items;

        dispatch({ type: FETCH_USERS_SUCCESS, payload: items });
    };
};


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST, payload: id });

        const res = await fetch(`https://replete-software.com/projects/rathi/api/delete-user/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // If API returns JSON you can parse it, not needed here
        dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (err) {
        dispatch({ type: DELETE_USER_FAIL, payload: err.message });
    }
};








