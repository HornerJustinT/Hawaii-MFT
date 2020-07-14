const studentReducer = (state = false, action) => {
  switch (action.type) {
    case "STUDENT":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default studentReducer;
