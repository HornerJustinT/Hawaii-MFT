const clientFocusReducer = (state = [], action) => {
    console.log('in clientFocusReducer', action.payload);
    if (action.type === 'SET_DEMOGRPHICS') {
        return action.payload;
    } 
    return state;
};

export default clientFocusReducer;