import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// will be fired on "create Registration key" actions
function* createResetKey(action) {
  try {
    yield axios.post(`/api/createResetKey/${action.payload}`);
    // should send registration key in the params
  } catch (error) {
    console.log("create reset Key put failed", error);
  }
}

function* createRegistrationKeySaga() {
    yield takeLatest('CREATE_RESET_KEY', createResetKey);
}

export default createRegistrationKeySaga;