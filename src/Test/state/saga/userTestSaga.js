import { put, call } from 'redux-saga/effects';
import {
  userRegisterService,
  questionListService,
  getResultService,
  userResultSetService,
  userAnswerSubmitService,
  userFeedbackService,
  testLinkService
} from '../service/userTestService';
import { setStorage } from '../utils/Cookies';
import * as actions from '../action/actionType';

export function* userRegisterSaga(payload) {
  try {
    yield put({ type: actions.EXAM_LOADING_UI });
    const response = yield call(userRegisterService, payload.user);
    if (response.status) {
      const customResponse = response.data[0];
      setStorage('registerDetails', {
        ...payload.user,
        status: response.status,
        ...response.data[0]
      });
      yield put({ type: actions.USER_REGISTER_SUCCESS, customResponse });
      yield put({ type: actions.STOP_EXAM_LOADING_UI });
    } else {
      yield put({
        type: actions.SET_EXAM_ERROR,
        error: response.error[0].Message
      });
    }
  } catch (error) {
    yield put({ type: actions.USER_REGISTER_ERROR, error });
  }
}
export function* questionListSaga(payload) {
  try {
    const response = yield call(questionListService, payload.item);

    yield put({ type: actions.QUESTION_LIST_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.QUESTION_LIST_ERROR, error });
  }
}
export function* userAnswerSubmitSaga(payload) {
  try {
    const response = yield call(userAnswerSubmitService, payload.data);

    yield put({ type: actions.ANSWER_SUBMIT_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.ANSWER_SUBMIT_ERROR, error });
  }
}
export function* userFeedbackSaga(payload) {
  try {
    const response = yield call(userFeedbackService, payload.data);
    yield put({ type: actions.USER_FEEDBACK_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.USER_REGISTER_ERROR, error });
  }
}
export function* getResultSaga(payload) {
  try {
    const response = yield call(userResultSetService, payload.item);
    let customResponse = [];
    if (response) {
      customResponse = yield call(getResultService, payload.item);
    }
    yield put({ type: actions.GET_RESULT_SUCCESS, customResponse });
  } catch (error) {
    yield put({ type: actions.GET_RESULT_ERROR, error });
  }
}
export function* testLinkSaga(payload) {
  try {
    yield put({ type: actions.EXAM_LOADING_UI });
    const response = yield call(testLinkService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: actions.TEST_LINK_SUCCESS, customResponse });
    yield put({ type: actions.STOP_EXAM_LOADING_UI });
  } catch (error) {
    yield put({ type: actions.SET_EXAM_ERROR, error });
  }
}
