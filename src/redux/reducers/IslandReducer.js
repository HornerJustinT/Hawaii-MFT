const IslandReducer = (state = [], action) => {
    console.log('in islandReducer', action.payload);
    if (action.type === 'SET_ISLANDS') {
        return action.payload;
    } 
    return state;
};

export default IslandReducer ;