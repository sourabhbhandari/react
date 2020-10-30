import { put, call } from 'redux-saga/effects';
import {
  addTestService,
  deleteTestService,
  publishTestService,
  editTestService,
  getTestListService,
  getAttemptListService,
  getTestAnalyticsService
} from '../services/testServices';

import * as actions from '../actions/actionType';

export function* addTestSaga(payload) {
  try {
    yield put({ type: actions.TEST_LOADING_UI });
    const response = yield call(addTestService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: actions.ADD_SUCCESS, customResponse });
    yield put({ type: actions.STOP_TEST_LOADING_UI });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'Error while adding Test'
    });
  }
}

export function* editTestSaga(payload) {
  try {
    yield put({ type: actions.TEST_LOADING_UI });
    const response = yield call(editTestService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: actions.EDIT_SUCCESS, customResponse });
    yield put({ type: actions.STOP_TEST_LOADING_UI });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'Error occurs while update'
    });
  }
}

export function* deleteTestSaga(payload) {
  try {
    const response = yield call(deleteTestService, payload.item);
    const customResponse = {
      message: response.data[0].Message,
      Test_Id: payload.item
    };
    yield put({ type: actions.DELETE_SUCCESS, customResponse });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'Error occurs while delete'
    });
  }
}

export function* getTestListSaga(payload) {
  try {
    yield put({ type: actions.TEST_LOADING_UI });
    const response = yield call(getTestListService, payload.User_Id);
    let customResponse = response.data[0];
    yield put({ type: actions.GET_TEST_LIST_SUCCESS, customResponse });
    yield put({ type: actions.STOP_TEST_LOADING_UI });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'error occurs while fetching list'
    });
  }
}
export function* publishTestSaga(payload) {
  try {
    const response = yield call(publishTestService, payload.item);
    let customResponse = response.data;
    yield put({ type: actions.PUBLISH_TEST_SUCCESS, customResponse });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'error occurs while fetching list'
    });
  }
}
export function* getTestAnalyticsSaga(payload) {
  try {
    const response = yield call(getTestAnalyticsService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: actions.GET_TEST_ANALYTICS_SUCCESS, customResponse });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'error occurs while fetching list'
    });
  }
}
export function* getAttemptListSaga(payload) {
  try {
    yield put({ type: actions.TEST_LOADING_UI });
    const response = yield call(getAttemptListService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: actions.GET_ATTEMPT_LIST_SUCCESS, customResponse });
    yield put({ type: actions.STOP_TEST_LOADING_UI });
  } catch (error) {
    yield put({
      type: actions.SET_TEST_ERROR,
      error: 'error occurs while fetching list'
    });
  }
}
