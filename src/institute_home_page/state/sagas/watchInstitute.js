import {takeLatest} from 'redux-saga/effects';
import {
  instituteStartSaga,
  instituteSaga,
  querySubmitSaga,
} from './instituteSagas';
import * as actions from '../actions/actionType';

export default function* watchInstitute() {
  yield takeLatest(actions.INSTITUTE_START, instituteStartSaga);
  yield takeLatest(actions.TESTSERIES, instituteSaga);
  yield takeLatest(actions.QUERY_SUBMIT, querySubmitSaga);
}
