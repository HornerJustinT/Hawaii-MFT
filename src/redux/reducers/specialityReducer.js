const specialityReducer = (state = [], action) => {
    console.log('in specialityReducer', action.payload);
    if (action.type === 'SET_SPECIALTY') {
        return action.payload;
    } 
    return state;
};

export default specialityReducer;