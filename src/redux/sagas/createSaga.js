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
    console.log('in addMember Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile`, action.payload);
       console.log('Sending new member info from the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending members info to the server', error);
    }
}

function* addLanguage(action) {
    console.log('in addLanguage Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/language`, action.payload);
       console.log('Sending new member language to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending new member language info to the server', error);
    }
}

function* addIsland(action) {
    console.log('in addIsland Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/islands`, action.payload);
       console.log('Sending new member island info to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending new member island info to the server', error);
    }
}

function* addEmail(action) {
    console.log('in addEmail Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/email`, action.payload);
       console.log('Sending new member email info to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending new member email info to the server', error);
    }
}

function* addCreateProfile (action) {
    console.log('in createProfile saga', action.payload)
    try {
     
       yield put ({type: 'SET_CREATE_PROFILE', payload: action.payload});
    } catch (error) {
        console.log('createProfile reducer failed', error);
    }
}

function* addZipCode(action) {
    console.log('in createProfile saga', action.payload)
    try {
     
       yield put ({type: 'SET_ZIP_CODE', payload: action.payload});
    } catch (error) {
        console.log('Contact Info reducer failed', error);
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

function* fetchAgeGroups (action){
    try{
        const response = yield axios.get(`/api/profile/age`)
        console.log(response)
        yield put ({type: 'SET_AGE_GROUPS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching age group served', error)
    }
}

function* fetchSessionFormat (action){
    try{
        const response = yield axios.get(`/api/profile/session`)
        console.log(response)
        yield put ({type: 'SET_SESSION_FORMAT', payload: response.data});
    }
    catch(error){
        console.log('error in fetching session format', error)
    }
}

function* createSaga() {
    yield takeLatest('CREATE_PROFILE', createProfile);
    yield takeLatest('ADD_CREATE_PROFILE', addCreateProfile);
    yield takeLatest('FETCH_LANGUAGES', fetchLanguages);
    yield takeLatest('FETCH_ISLANDS', fetchIslands);
    yield takeLatest('FETCH_SPECIALTY', fetchSpecialty);
    yield takeLatest('FETCH_SUPERVISION_STATUS',fetchSupervision);
    yield takeLatest('FETCH_INSURANCE_TAKEN',fetchInsuranceTaken);
    yield takeLatest('FETCH_LICENSE_TYPE',fetchLicenseType);
    yield takeLatest('FETCH_TREATMENT_APPROACHES',fetchTreatmentApproaches);
    yield takeLatest('FETCH_DEMOGRPHICS',fetchDemographics);
    yield takeLatest('FETCH_AGE_GROUPS', fetchAgeGroups);
    yield takeLatest('FETCH_SESSION_FORMAT', fetchSessionFormat);
    yield takeLatest('ADD_ZIP_CODE', addZipCode);
    yield takeLatest('ADD_MEMBER', addMember);
    yield takeLatest('ADD_LANGUAGE', addLanguage);
    yield takeLatest('ADD_ISLAND', addIsland);
    yield takeLatest('ADD_EMAIL', addEmail);
}

export default createSaga;