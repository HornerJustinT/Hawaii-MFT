const contactAddressReducer = (state = [], action) => {
    console.log('in contactAddressReducer', action.payload);
    if (action.type === 'SET_ADDRESS') {
        return action.payload;
    } 
    return state;
};

export default contactAddressReducer;