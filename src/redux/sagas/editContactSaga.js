import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// will be fired on "EDIT_CONTACT" actions
function* editContact(action) {
  try {
    yield axios.put("/profile/contact", action.payload);
    yield put({ type: "FETCH_PROFILE_REDUCER", payload: action.payload });
  } catch (error) {
    console.log("editContact PUT request failed", error);
  }
}

function* editContactSaga() {
  yield takeLatest("EDIT_CONTACT", editContact);
}

export default editContactSaga;
