const treatmentReducer = (state = [], action) => {
    if (action.type === 'SET_TREATMENT_APPROACHES') {
        return action.payload;
    } 
    return state;
};

export default treatmentReducer;