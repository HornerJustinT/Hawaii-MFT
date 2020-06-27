//holds a boolean for registration key validation
const registrationKeyValidationReducer = (state = '', action) => {
    if (action.type === 'CHECK_KEY') {
        return action.payload;
    } 
    return state;
};

export default registrationKeyValidationReducer;