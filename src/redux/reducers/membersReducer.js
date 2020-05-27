const membersReducer = (state = [], action) => {
    console.log('in membersReducer', action.payload);
    if (action.type === 'GET_MEMBERS_REDUCER') {
        return action.payload;
    } 
    return state;
};

export default membersReducer;