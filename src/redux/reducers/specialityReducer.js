const specialityReducer = (state = [], action) => {
    if (action.type === 'SET_SPECIALTY') {
        return action.payload;
    } 
    return state;
};

export default specialityReducer;