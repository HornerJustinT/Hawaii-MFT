import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "EDIT_PROFILE" actions
function* editProfile(action) {
    console.log('in editProfile saga', action.payload)
    try {
        yield axios.put('/profile', action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload });
    } catch (error) {
        console.log('editProfile PUT request failed', error);
    }
}

function* projectSaga() {
    yield takeLatest('EDIT_PROFILE', editProfile);
}

export default projectSaga;