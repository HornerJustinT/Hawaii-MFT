import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "CREATE_PROFILE" actions
//initiates POST request when user creates new profile
function* createProfile(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
       const response = yield axios.post(`/profile`, action.payload);
       console.log('Getting new member info from the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in fetching members info from the server', error);
    }
}

function* addMember(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
       const response = yield axios.post(`/api/profile`, action.payload);
       console.log('Sending new member info to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('createProfile saga POST request failed', error);
    }
}


function*fetchLanguages(action){
    try{
        const response = yield axios.get(`/api/profile`)
        console.log(response)
        yield put ({type: 'SET_LANGUAGES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Books', error)
    }
}

function* createSaga() {
    yield takeLatest('CREATE_PROFILE', createProfile);
    yield takeLatest('ADD_MEMBER', addMember);
    yield takeLatest('FETCH_LANGUAGES', fetchLanguages);
}

export default createSaga;