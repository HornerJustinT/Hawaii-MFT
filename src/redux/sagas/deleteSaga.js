import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// will be fired on "DELETE_PROFILE" actions
function* deleteProfile(action) {
    console.log('in deleteProfile saga', action.payload.id)
    try {
        yield axios.delete(`/profile/${action.payload.id}`);
    } catch (error) {
        console.log('deleteProfile saga DELETE request failed', error);
    }
}

function* deleteSaga() {
    yield takeLatest('DELETE_PROFILE', deleteProfile);
}

export default deleteSaga;