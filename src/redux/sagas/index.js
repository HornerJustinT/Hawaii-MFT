import { all } from 'redux-saga/effects';

import createSaga from './createSaga';
import deleteSaga from "./deleteSaga";
import editBasicSaga from './editBasicSaga';
import editContactSaga from "./editContactSaga";
import editPracticeSaga from "./editPracticeSaga";
import fetchMemberSaga from './fetchMemberSaga';
import fetchMemberSageAdvanced from "./fetchMemberSageAdvanced";
import fetchProfileSaga from './fetchProfileSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from "./userSaga";
import createRegistrationKeySaga from "./createRegistrationKeySaga";
import checkRegistrationKeySaga from "./checkRegistrationKeySaga";
import mailerSaga from "./mailerSaga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    createSaga(),
    deleteSaga(),
    editBasicSaga(),
    editContactSaga(),
    editPracticeSaga(),
    fetchMemberSaga(),
    fetchMemberSageAdvanced(),
    fetchProfileSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
    createRegistrationKeySaga(),
    checkRegistrationKeySaga(),
    mailerSaga(),
  ]);
}
