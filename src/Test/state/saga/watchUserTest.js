import { takeLatest } from 'redux-saga/effects';
import {
  userRegisterSaga,
  questionListSaga,
  userAnswerSubmitSaga,
  userFeedbackSaga,
  getResultSaga,
  testLinkSaga
} from './userTestSaga';
import * as actions from '../action/actionType';

export default function* watchInstitute() {
  yield takeLatest(actions.USER_REGISTER, userRegisterSaga);
  yield takeLatest(actions.QUESTION_LIST, questionListSaga);
  yield takeLatest(actions.ANSWER_SUBMIT, userAnswerSubmitSaga);
  yield takeLatest(actions.USER_FEEDBACK, userFeedbackSaga);
  yield takeLatest(actions.GET_RESULT, getResultSaga);
  yield takeLatest(actions.TEST_LINK, testLinkSaga);
}
