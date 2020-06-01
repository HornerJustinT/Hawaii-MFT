const languageReducer = (state = [], action) => {
    console.log('in languageReducer', action.payload);
    if (action.type === 'SET_LANGUAGES') {
        return action.payload;
    } 
    return state;
};

export default languageReducer;



 