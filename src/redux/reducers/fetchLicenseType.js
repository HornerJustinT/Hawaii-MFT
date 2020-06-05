//holds all the license types from the license type table
//all possible selection options for user
const licenseTypeReducer = (state = [], action) => {
    if (action.type === 'SET_LICENSE_TYPE') {
        return action.payload;
    } 
    return state;
};

export default licenseTypeReducer;