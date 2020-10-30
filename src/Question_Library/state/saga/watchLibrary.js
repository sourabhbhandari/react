import {takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/actionType';
import {
  getQuestionLibrarySaga,
  sortQuestionLibrarySaga,
  selectQuestionsSaga,
  addQuestionToTestSaga,
} from './librarySaga';

export default function* watchLibrary() {
  yield takeLatest(actions.GET_QUESTION_LIBRARY, getQuestionLibrarySaga);
  yield takeLatest(actions.SELECT_QUESTIONS, selectQuestionsSaga);
  yield takeLatest(actions.ADD_QUESTION_TO_TEST, addQuestionToTestSaga);
  yield takeLatest(actions.SORT_QUESTION_LIBRARY, sortQuestionLibrarySaga);
}
