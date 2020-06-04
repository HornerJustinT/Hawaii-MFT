const profileReducer = (state = [], action) => {
    console.log('in profileReducer KSKSKSKS', action.payload);
    if (action.type === 'GET_PROFILE_REDUCER') {
        return action.payload;
    } else if (action.type === 'PROFILE_RESET') {
        return action.payload
    } else {
     return state;
    }
};

export default profileReducer;
