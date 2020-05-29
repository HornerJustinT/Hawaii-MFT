import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "CREATE_PROFILE" actions
//initiates POST request when user creates new profile
function* createProfile(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
        yield axios.post(`/profile`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('createProfile saga POST request failed', error);
    }
}

function* addMember(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
        yield axios.post(`/profile`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('createProfile saga POST request failed', error);
    }
}

function* createSaga() {
    yield takeLatest('CREATE_PROFILE', createProfile);
}

export default createSaga;