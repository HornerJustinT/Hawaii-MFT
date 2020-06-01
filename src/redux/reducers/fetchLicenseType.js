const licenseTypeReducer = (state = [], action) => {
    console.log('in licenseTypeReducer', action.payload);
    if (action.type === 'SET_LICENSE_TYPE') {
        return action.payload;
    } 
    return state;
};

export default licenseTypeReducer;