import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "EDIT_PROFILE" actions
function* editBasic(action) {
    try {
        yield axios.put('/profile', action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload });
    } catch (error) {
        console.log('editProfile PUT request failed', error);
    }
}

function* editBasicSaga() {
    yield takeLatest('EDIT_BASIC', editBasic);
}

export default editBasicSaga;