import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "FETCH_PROFILE" actions
//initiates GET request when profile views load
function* fetchProfile(action) {
    console.log('here is action.payload for profile GET', action.payload.id);
    
    try {
        const response = yield axios.get(`/profile/${action.payload.id}`);

        console.log( 'here is response.data', response.data);
        // if (!action.admin && !response.data[0]){
        //     //! REPLACE THIS BEFORE DEPLOYING
        //     window.location.replace("http://localhost:3000/#/create-profile");
        // } else {
            //sends data to the profile reducer of one specific member
            yield put({ type: 'GET_PROFILE_REDUCER', payload: response.data });
        // }
    } catch (error) {
        console.log('fetchProfile saga GET request failed', error);
    }
}

function* fetchProfileSaga() {
    yield takeLatest('FETCH_PROFILE', fetchProfile);
}

export default fetchProfileSaga;