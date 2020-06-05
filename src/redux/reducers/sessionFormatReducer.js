const sessionFormatReducer = (state = [], action) => {
    if (action.type === 'SET_SESSION_FORMAT') {
        return action.payload;
    } 
    return state;
};

export default sessionFormatReducer;