const getUsersReducer = (state = [], action) => {
    if (action.type === 'GET_USERS_REDUCER') {
        return action.payload;
    }
    else if(action.type ==='RESET_USERS_REDUCER'){
        return []
    } 
    return state;
};



export default getUsersReducer;