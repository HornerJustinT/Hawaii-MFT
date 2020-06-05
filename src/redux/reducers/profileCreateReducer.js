const profileCreateReducer = (state = [], action) => {
    if (action.type === 'SET_CREATE_PROFILE') {
        return action.payload;
    } 
    return state;
};

export default profileCreateReducer;