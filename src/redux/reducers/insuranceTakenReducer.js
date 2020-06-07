//holds all the insurance types from the insurance table
//all possible selection options for user
const insuranceTakenReducer = (state = [], action) => {
    if (action.type === 'SET_INSURANCE_TAKEN') {
        return action.payload;
    } 
    return state;
};

export default insuranceTakenReducer;