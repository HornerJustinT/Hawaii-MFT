const contactAddressReducer = (state = [], action) => {
    if (action.type === 'SET_ADDRESS') {
        return action.payload;
    } 
    return state;
};

export default contactAddressReducer;