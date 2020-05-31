const practiceInfoReducer = (state = [], action) => {
    console.log('in practiceInfoReducer', action.payload);
    if (action.type === 'SET_SPECIALTY') {
        return action.payload;
    } 
    return state;
};

export default practiceInfoReducer;