import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addMember(action) {
    console.log('in addMember Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending members info to the server', error);
    }
}

function* addLanguage(action) {
    console.log('in addLanguage Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/language`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending new member language info to the server', error);
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

function* addAddress(action) {
    console.log('in createProfile saga', action.payload)
    try {
     
       yield put ({type: 'SET_ADDRESS', payload: action.payload});
    } catch (error) {
        console.log('Contact Info reducer failed', error);
    }
}

function* addContactInfo(action) {
    console.log('in addContactInfo Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/contactinfo`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending members contact info to the server', error);
    }
}

function* addPracticeInfo(action) {
    console.log('in addPracticeInfo Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile/practiceinfo`, action.payload);
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending members practice info to the server', error);
    }
}


function* fetchLanguages(action){
    try{
        const response = yield axios.get(`/api/profile/languages`)
        yield put ({type: 'SET_LANGUAGES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching languages', error)
    }
}

function* fetchIslands(action){
    try{
        const response = yield axios.get(`/api/profile/islands`)
        yield put ({type: 'SET_ISLANDS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Islands', error)
    }
}

function* fetchSpecialty(action){
    try{
        const response = yield axios.get(`/api/profile/specialty`)
        yield put ({type: 'SET_SPECIALTY', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Specialty', error)
    }
}

function* fetchSupervision(action){
    try{
        const response = yield axios.get(`/api/profile/supervision`)
        yield put ({type: 'SET_SUPERVISION_STATUS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Islands', error)
    }
}

function* fetchInsuranceTaken (action){
    try{
        const response = yield axios.get(`/api/profile/insurance`)
        yield put ({type: 'SET_INSURANCE_TAKEN', payload: response.data});
    }
    catch(error){
        console.log('error in fetching Insurance', error)
    }
}

function* fetchLicenseType (action){
    try{
        const response = yield axios.get(`/api/profile/license`)
        yield put ({type: 'SET_LICENSE_TYPE', payload: response.data});
    }
    catch(error){
        console.log('error in fetching License Type', error)
    }
}

function* fetchTreatmentApproaches (action){
    try{
        const response = yield axios.get(`/api/profile/treatment`)
        yield put ({type: 'SET_TREATMENT_APPROACHES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching treatment approaches', error)
    }
}

function* fetchDemographics (action){
    try{
        const response = yield axios.get(`/api/profile/demographics`)
        yield put ({type: 'SET_DEMOGRPHICS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching demographics', error)
    }
}

function* fetchAgeGroups (action){
    try{
        const response = yield axios.get(`/api/profile/age`)
        yield put ({type: 'SET_AGE_GROUPS', payload: response.data});
    }
    catch(error){
        console.log('error in fetching age group served', error)
    }
}

function* fetchSessionFormat (action){
    try{
        const response = yield axios.get(`/api/profile/session`)
        yield put ({type: 'SET_SESSION_FORMAT', payload: response.data});
    }
    catch(error){
        console.log('error in fetching session format', error)
    }
}

function* createSaga() {
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
    yield takeLatest('ADD_ADDRESS', addAddress);
    yield takeLatest('ADD_MEMBER', addMember);
    yield takeLatest('ADD_LANGUAGE', addLanguage);
    yield takeLatest('ADD_CONTACTINFO', addContactInfo);
    yield takeLatest('ADD_PRACTICEINFO', addPracticeInfo);
 
   
}

export default createSaga;