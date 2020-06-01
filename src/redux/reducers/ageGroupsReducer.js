const ageGroupReducer = (state = [], action) => {
    console.log('in ageGroupReducer', action.payload);
    if (action.type === 'SET_AGE_GROUPS') {
        return action.payload;
    } 
    return state;
};

export default ageGroupReducer;