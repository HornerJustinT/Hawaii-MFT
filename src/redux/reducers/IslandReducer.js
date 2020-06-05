const IslandReducer = (state = [], action) => {
    if (action.type === 'SET_ISLANDS') {
        return action.payload;
    } 
    return state;
};

export default IslandReducer ;