const getUsersReducer = (state = [], action) => {
    if (action.type === 'GET_USERS_REDUCER') {
        return action.payload;
    } 
    return state;
};



export default getUsersReducer;