import axios from 'axios';
import { takeLatest } from 'redux-saga/effects'; 

// will be fired on "create Registration key" actions
function* sendMailerEmail(action) {
    try {
        yield axios.post(`/api/mailer/modal`, action.payload);
        if (action.closeModal) action.closeModal();
    } catch (error) {
        console.log('check Registration Key put failed', error);
    }
}

function* checkRegistrationKeySaga() {
    yield takeLatest('SEND_EMAIL', sendMailerEmail);
}

export default checkRegistrationKeySaga;