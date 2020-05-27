import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "FETCH_MEMBERS" actions
//initiates GET request when HOME PAGE loads
function* fetchMembers(action) {
    console.log('in fetchMember saga', action.payload)
    try {
        const response = yield axios.get(`/member`)
        yield put({ type: 'GET_MEMBERS_REDUCER', payload: response.data });
    } catch (error) {
        console.log('fetchMembers saga GET request failed', error);
    }
}

function* fetchMemberSaga() {
    yield takeLatest('FETCH_MEMBERS', fetchMembers);
}

export default fetchMemberSaga;