//holds all the members and their information
const membersReducer = (state = [], action) => {
    if (action.type === 'GET_MEMBERS_REDUCER') {
        return action.payload;
    } 
    return state;
};

export default membersReducer;