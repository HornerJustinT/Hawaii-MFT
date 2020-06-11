import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// will be fired on "EDIT_PRACTICE" actions
function* editPractice(action) {
  try {
    yield axios.put("/profile/practice", action.payload);
    yield put({ type: "FETCH_PROFILE_REDUCER", payload: action.payload });
  } catch (error) {
    console.log("editContact PUT request failed", error);
  }
}

// will be fired on "ENABLE_PROFILE" actions
function* profileEnable(action) {
  try {
    yield axios.put("/profile/enable", action.payload);
    yield put({ type: "FETCH_PROFILE_REDUCER", payload: action.payload });
  } catch (error) {
    console.log("editContact PUT request failed", error);
  }
}

function* editPracticeSaga() {
  yield takeLatest("EDIT_PRACTICE", editPractice);
  yield takeLatest("ENABLE_PROFILE", profileEnable);
}

export default editPracticeSaga;
