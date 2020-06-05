const ageGroupReducer = (state = [], action) => {
    if (action.type === 'SET_AGE_GROUPS') {
        return action.payload;
    } 
    return state;
};

export default ageGroupReducer;