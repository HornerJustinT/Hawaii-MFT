const clientFocusReducer = (state = [], action) => {
    if (action.type === 'SET_DEMOGRPHICS') {
        return action.payload;
    } 
    return state;
};

export default clientFocusReducer;