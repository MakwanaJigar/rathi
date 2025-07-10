const initialState = {
  challanData: {},
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_CHALLAN_FORM':
      return {
        ...state,
        challanData: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
