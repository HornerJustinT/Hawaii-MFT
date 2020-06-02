const contactInfoReducer = (state = [], action) => {
    console.log('in profileCreateReducer', action.payload);
    if (action.type === 'SET_ZIP_CODE') {
        return action.payload;
    } 
    return state;
};

export default contactInfoReducer;