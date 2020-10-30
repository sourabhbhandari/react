import {put, call} from 'redux-saga/effects';

import * as actions from '../actions/actionType';
import {
  getQuestionLibraryService,
  addQuestionToTestService,
} from '../services/libraryService';

export function* getQuestionLibrarySaga(request) {
  try {
    yield put({type: actions.LOADING_UI});
    const response = yield call(getQuestionLibraryService, request.item);

    yield put({type: actions.GET_QUESTION_LIBRARY_SUCCESS, response});
  } catch (error) {
    yield put({
      type: actions.GET_QUESTION_LIBRARY_ERROR,
      response: 'Error while retrieving data',
    });
  }
}
export function* sortQuestionLibrarySaga(request) {}

export function* selectQuestionsSaga(request) {
  try {
    const response = request.item;
    yield put({type: actions.SELECT_QUESTIONS_SUCCESS, response});
  } catch (error) {
    yield put({
      type: actions.SELECT_QUESTIONS_ERROR,
      response: 'some error occurs while fetching data',
    });
  }
}
export function* addQuestionToTestSaga(request) {
  try {
    const response = yield call(addQuestionToTestService, request.item);

    yield put({type: actions.ADD_QUESTION_TO_TEST_SUCCESS, response});
  } catch (error) {
    yield put({
      type: actions.ADD_QUESTION_TO_TEST_ERROR,
      response: 'some error occurs while fetching data',
    });
  }
}
