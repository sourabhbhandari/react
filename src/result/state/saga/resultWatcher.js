import { takeLatest } from 'redux-saga/effects';
import { getResultSaga, getUserAnalyticsSaga } from './resultSaga';
import * as actions from '../action/actionTypes';

export default function* watchInstitute() {
  yield takeLatest(actions.GET_USER_RESULT, getResultSaga);
  yield takeLatest(actions.GET_USER_ANALYTICS, getUserAnalyticsSaga);
}
