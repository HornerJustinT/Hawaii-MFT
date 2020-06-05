//holds all the treatments from the treatment preferences table
//all possible selection options for user
const treatmentReducer = (state = [], action) => {
    if (action.type === 'SET_TREATMENT_APPROACHES') {
        return action.payload;
    } 
    return state;
};

export default treatmentReducer;