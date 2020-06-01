import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "CREATE_PROFILE" actions
//initiates POST request when user creates new profile
function* createProfile(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
       const response = yield axios.post(`/profile`, action.payload);
       console.log('Getting new member info from the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in fetching members info from the server', error);
    }
}

function* addMember(action) {
    console.log('in createProfile saga', action.payload.id)
    try {
       const response = yield axios.post(`/api/profile`, action.payload);
       console.log('Sending new member info to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('createProfile saga POST request failed', error);
    }
}


function* fetchLanguages(action){
    try{
        const response = yield axios.get(`/api/profile`)
        console.log(response)
        yield put ({type: 'SET_LANGUAGES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching languages', error)
    }
}

function* fetchIslands(action){
    try{
        const response = yield axios.get(`/api/profile/islands`)
        console.log(response)
        yield put ({type: 'SET_ISLANDS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Islands', error)
    }
}

function* fetchSpecialty(action){
    try{
        const response = yield axios.get(`/api/profile/specialty`)
        console.log(response)
        yield put ({type: 'SET_SPECIALTY', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Specialty', error)
    }
}

function* fetchSupervision(action){
    try{
        const response = yield axios.get(`/api/profile/supervision`)
        console.log(response)
        yield put ({type: 'SET_SUPERVISION_STATUS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Islands', error)
    }
}

function* fetchInsuranceTaken (action){
    try{
        const response = yield axios.get(`/api/profile/insurance`)
        console.log(response)
        yield put ({type: 'SET_INSURANCE_TAKEN', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Insurance', error)
    }
}

function* fetchLicenseType (action){
    try{
        const response = yield axios.get(`/api/profile/license`)
        console.log(response)
        yield put ({type: 'SET_LICENSE_TYPE', payload: response.data});
    }
    catch(error){
        console.log('error in fetching License Type', error)
    }
}

function* fetchTreatmentApproaches (action){
    try{
        const response = yield axios.get(`/api/profile/treatment`)
        console.log(response)
        yield put ({type: 'SET_TREATMENT_APPROACHES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching treatment approaches', error)
    }
}

function* fetchDemographics (action){
    try{
        const response = yield axios.get(`/api/profile/demographics`)
        console.log(response)
        yield put ({type: 'SET_DEMOGRPHICS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching demographics', error)
    }
}
function* createSaga() {
    yield takeLatest('CREATE_PROFILE', createProfile);
    yield takeLatest('ADD_MEMBER', addMember);
    yield takeLatest('FETCH_LANGUAGES', fetchLanguages);
    yield takeLatest('FETCH_ISLANDS', fetchIslands);
    yield takeLatest('FETCH_SPECIALTY', fetchSpecialty);
    yield takeLatest('FETCH_SUPERVISION_STATUS',fetchSupervision);
    yield takeLatest('FETCH_INSURANCE_TAKEN',fetchInsuranceTaken);
    yield takeLatest('FETCH_LICENSE_TYPE',fetchLicenseType);
    yield takeLatest('FETCH_TREATMENT_APPROACHES',fetchTreatmentApproaches);
    yield takeLatest('FETCH_DEMOGRPHICS',fetchDemographics);
}

export default createSaga;