//holds all the islands from the islands table
//all possible selection options for user
const IslandReducer = (state = [], action) => {
    if (action.type === 'SET_ISLANDS') {
        return action.payload;
    } 
    return state;
};

export default IslandReducer ;