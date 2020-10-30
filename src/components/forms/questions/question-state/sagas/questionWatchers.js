import { takeLatest } from 'redux-saga/effects';
import {
  getQuestionListSaga,
  addQuestionSaga,
  editQuestionSaga
} from './questionSaga';

import * as ACTIONS from '../actions';

export default function* watchQuestions() {
  yield takeLatest(ACTIONS.GET_QUESTION_LIST, getQuestionListSaga);
  yield takeLatest(ACTIONS.ADD_QUESTION, addQuestionSaga);
  yield takeLatest(ACTIONS.EDIT_QUESTION, editQuestionSaga);
}
