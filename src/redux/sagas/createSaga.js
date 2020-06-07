import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//will post data from ADD_MEMBER action 
function* addMember(action) {
    console.log('in addMember Saga', action.payload)
    try {
       const response = yield axios.post(`api/profile`, action.payload);
       console.log('Sending new member info to the server',response)
        yield put({ type: 'FETCH_PROFILE_REDUCER', payload: action.payload.id });
    } catch (error) {
        console.log('Error in sending members info to the server', error);
    }
}

//will pass the info from the createprofile page into SET_CREATE_PROFILE reducer
function* addCreateProfile (action) {
    console.log('in createProfile saga', action.payload)
    try {
     
       yield put ({type: 'SET_CREATE_PROFILE', payload: action.payload});
    } catch (error) {
        console.log('createProfile reducer failed', error);
    }
}

//will pass the info from contactInfo page into SET_ADDRESS reducer
function* addAddress(action) {
    console.log('in createProfile saga', action.payload)
    try {
     
       yield put ({type: 'SET_ADDRESS', payload: action.payload});
    } catch (error) {
        console.log('Contact Info reducer failed', error);
    }
}


//will fetch all the languages in in createProfile page
function* fetchLanguages(action){
    try{
        const response = yield axios.get(`/api/profile/languages`)
        yield put ({type: 'SET_LANGUAGES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching languages', error)
    }
}

//will fetch all the island options in contactInfo
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

//will fetch all the specialty options for practiceInfo page
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

//will fetch all the supervision status in practiceInfo page
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

//will fetch all the Insurance type in parcticeinfo page
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

//will fetch all the license type in practiceinfo page
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

//will fetch all the treatment preferences in practiceinfo page
function* fetchTreatmentApproaches (action){
    try{
        const response = yield axios.get(`/api/profile/treatment`)
        console.log('in XXX FETCH TREATMENT', response.data)
        yield put ({type: 'SET_TREATMENT_APPROACHES', payload: response.data});
    }
    catch(error){
        console.log('error in fetching treatment approaches', error)
    }
}

//will fetch all the client type groups in practiceinfo page
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

//will fetch all the age group in practiceinfo page
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

//will fetch all the session format options in practiceinfo page
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
  
 
   
}

export default createSaga;