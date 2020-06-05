const languageReducer = (state = [], action) => {
    if (action.type === 'SET_LANGUAGES') {
        return action.payload;
    } 
    return state;
};

export default languageReducer;



 