const profileCreateReducer = (state = [], action) => {
    console.log('in profileCreateReducer', action.payload);
    if (action.type === 'SET_CREATE_PROFILE') {
        return action.payload;
    } 
    return state;
};

export default profileCreateReducer;