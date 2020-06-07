//holds all the languages from the languages table
//all possible selection options for user
const languageReducer = (state = [], action) => {
    if (action.type === 'SET_LANGUAGES') {
        return action.payload;
    } 
    return state;
};

export default languageReducer;



 