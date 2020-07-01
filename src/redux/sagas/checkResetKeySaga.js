import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'; 

// will be fired on "create Registration key" actions
function* checkResetKey(action) {
  console.log(`/api/checkRegistrationKey/${action.payload}`);
  try {
    const results = yield axios.get(`/api/checkResetKey/${action.payload}`);
    let allowed = false;
    if (results.data[0] && results.data[0].used === false) {
      allowed = true;
    }
    yield put({ type: "CHECK_KEY", payload: allowed });
    // should send registration key in the params
  } catch (error) {
    console.log("check reset Key put failed", error);
  }
}

function* checkRegistrationKeySaga() {
    yield takeLatest('CHECK_RESET_KEY', checkResetKey);
}

export default checkRegistrationKeySaga;