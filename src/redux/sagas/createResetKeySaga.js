import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// will be fired on "create Registration key" actions
function* createResetKey(action) {
  try {
    yield axios.post(`/api/createResetKey/${action.payload.username}`);
    // should send registration key in the params
  } catch (error) {
    console.log("create reset Key put failed", error);
  }
}

function* createRegistrationKeySaga() {
    yield takeLatest('FORGOT_PASSWORD', createResetKey);
}

export default createRegistrationKeySaga;