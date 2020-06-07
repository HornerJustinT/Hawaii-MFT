//holds all the specialties from the specialties table
//all possible selection options for user
const specialityReducer = (state = [], action) => {
    if (action.type === 'SET_SPECIALTY') {
        return action.payload;
    } 
    return state;
};

export default specialityReducer;