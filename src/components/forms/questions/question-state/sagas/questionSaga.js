import { put, call } from 'redux-saga/effects';
import {
  getQuestionListService,
  addQuestionService,
  editQuestionService
} from '../services/questionService';

import * as ACTIONS from '../actions';

export function* getQuestionListSaga(payload) {
  try {
    yield put({ type: ACTIONS.QUESTION_LOADING_UI });
    const response = yield call(getQuestionListService, payload.item);
    const customResponse = response;
    yield put({ type: ACTIONS.GET_QUESTION_LIST_SUCCESS, customResponse });
    yield put({ type: ACTIONS.STOP_QUESTION_LOADING_UI });
  } catch (err) {
    yield put({
      type: ACTIONS.SET_QUESTION_ERROR,
      error: 'Error occurs while fetching Data'
    });
  }
}
export function* addQuestionSaga(payload) {
  try {
    yield put({ type: ACTIONS.QUESTION_LOADING_UI });
    const response = yield call(addQuestionService, payload.item);
    yield put({ type: ACTIONS.ADD_QUESTION_SUCCESS, response });
    yield put({ type: ACTIONS.STOP_QUESTION_LOADING_UI });
  } catch (err) {
    yield put({
      type: ACTIONS.SET_QUESTION_ERROR,
      error: 'Error Occurs while adding'
    });
  }
}
export function* editQuestionSaga(payload) {
  try {
    yield put({ type: ACTIONS.QUESTION_LOADING_UI });
    const response = yield call(editQuestionService, payload.item);
    yield put({ type: ACTIONS.EDIT_QUESTION_SUCCESS, response });
    yield put({ type: ACTIONS.STOP_QUESTION_LOADING_UI });
  } catch (err) {
    yield put({
      type: ACTIONS.SET_QUESTION_ERROR,
      error: 'Error occurs while update'
    });
  }
}
