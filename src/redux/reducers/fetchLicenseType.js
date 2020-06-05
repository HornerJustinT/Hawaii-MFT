const licenseTypeReducer = (state = [], action) => {
    if (action.type === 'SET_LICENSE_TYPE') {
        return action.payload;
    } 
    return state;
};

export default licenseTypeReducer;