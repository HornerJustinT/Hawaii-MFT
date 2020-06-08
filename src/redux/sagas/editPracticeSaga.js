import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// will be fired on "EDIT_PRACTICE" actions
function* editPractice(action) {
  console.log("in editPractice saga", action.payload);
  try {
    yield axios.put("/profile/practice", action.payload);
    yield put({ type: "FETCH_PROFILE_REDUCER", payload: action.payload });
  } catch (error) {
    console.log("editContact PUT request failed", error);
  }
}

function* editPracticeSaga() {
  yield takeLatest("EDIT_PRACTICE", editPractice);
}

export default editPracticeSaga;
