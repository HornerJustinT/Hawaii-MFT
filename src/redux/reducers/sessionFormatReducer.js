const sessionFormatReducer = (state = [], action) => {
    console.log('in sessionFormatReducer', action.payload);
    if (action.type === 'SET_SESSION_FORMAT') {
        return action.payload;
    } 
    return state;
};

export default sessionFormatReducer;