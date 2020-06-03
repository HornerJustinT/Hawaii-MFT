import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMembersAdmin(action) {
  console.log("in fetchMembersAdmin saga", action.payload);
  if (action.payload) {
    try {
      const response = yield axios.get(`/api/admin/${action.payload.type}/${action.payload.search}`);
      yield put({ type: "GET_MEMBERS_REDUCER", payload: response.data });
    } catch (error) {
      console.log("fetchMembersAdmin saga GET request failed", error);
    }
  } else {
    try {
      const response = yield axios.get(`/api/admin`);
      yield put({ type: "GET_MEMBERS_REDUCER", payload: response.data });
    } catch (error) {
      console.log("fetchMembersAdmin saga GET request failed", error);
    }

  }
}

function* fetchAdminMembers() {
  yield takeLatest("ADMIN_FETCH_MEMBERS", fetchMembersAdmin);
}

export default fetchAdminMembers;