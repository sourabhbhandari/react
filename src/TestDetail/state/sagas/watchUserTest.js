import { takeLatest } from 'redux-saga/effects';
import {
  addTestSaga,
  editTestSaga,
  getTestListSaga,
  deleteTestSaga,
  publishTestSaga,
  getAttemptListSaga,
  getTestAnalyticsSaga
} from './testSagas';
import * as actions from '../actions/actionType';

export default function* watchTest() {
  yield takeLatest(actions.ADD_TEST, addTestSaga);
  yield takeLatest(actions.EDIT_TEST, editTestSaga);
  yield takeLatest(actions.GET_TEST_LIST, getTestListSaga);
  yield takeLatest(actions.DELETE_TEST, deleteTestSaga);
  yield takeLatest(actions.PUBLISH_TEST, publishTestSaga);
  yield takeLatest(actions.GET_ATTEMPT_LIST, getAttemptListSaga);
  yield takeLatest(actions.GET_TEST_ANALYTICS, getTestAnalyticsSaga);
}
