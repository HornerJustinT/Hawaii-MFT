const saveUserReducer = (state =[], action) =>{
    if(action.type === 'SAVE_USER'){
        return action.payload;
    }
    return state;
}
export default saveUserReducer;