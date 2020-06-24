import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// will be fired on "create Registration key" actions
function* createRegistrationKey(action) {
    try {
        yield axios.post(`/api/createRegistrationKey/${action.payload}`);
        // should send registration key in the params
    } catch (error) {
        console.log('create Registration Key put failed', error);
    }
}

function* createRegistrationKeySaga() {
    yield takeLatest('CREATE_REGISTRATION_KEY', createRegistrationKey);
}

export default createRegistrationKeySaga;