const insuranceTakenReducer = (state = [], action) => {
    console.log('in insuranceTakenReducer', action.payload);
    if (action.type === 'SET_INSURANCE_TAKEN') {
        return action.payload;
    } 
    return state;
};

export default insuranceTakenReducer;