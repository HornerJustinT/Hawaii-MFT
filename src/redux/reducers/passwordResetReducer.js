//holds a boolean for registration key validation
const passwordResetReducer = (state = '', action) => {
  if (action.type === "PASSWORD_VALIDATION") {
    return action.payload;
  }
  return state;
};

export default passwordResetReducer;