const treatmentReducer = (state = [], action) => {
    console.log('in languageReducer', action.payload);
    if (action.type === 'SET_TREATMENT_APPROACHES') {
        return action.payload;
    } 
    return state;
};

export default treatmentReducer;