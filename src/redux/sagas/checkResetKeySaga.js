import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'; 

// will be fired on "create Registration key" actions
function* checkResetKey(action) {
  try {
    const results = yield axios.get(`/api/checkResetKey/${action.payload}`);
    let payload = {}
    if (results.data.rows[0]) {
      payload = results.data.rows[0];
    }
    yield put({ type: "PASSWORD_VALIDATION", payload: payload });
    // should send registration key in the params
  } catch (error) {
    console.log("check reset Key put failed", error);
  }
}

// will be fired on "create Registration key" actions
function* newPassword(action) {
    console.log(action.payload)
  try {
    yield axios.post(`/api/user/passwordreset`, action.payload);
  } catch (error) {
    console.log("check reset Key put failed", error);
  }
}


function* checkResetKeySaga() {
  yield takeLatest("CHECK_RESET_KEY", checkResetKey);
  yield takeLatest("NEW_PASSWORD", newPassword);
}

export default checkResetKeySaga;