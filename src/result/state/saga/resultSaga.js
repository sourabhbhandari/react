import { put, call } from 'redux-saga/effects';
import {
  getResultService,
  getUserAnalyticsService
} from '../service/resultService';
import * as actions from '../action/actionTypes';

export function* getResultSaga(payload) {
  try {
    const response = yield call(getResultService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: actions.GET_USER_RESULT_SUCCESS, customResponse });
  } catch (error) {
    yield put({ type: actions.STOP_RESULT_UI_LOADING });
  }
}
export function* getUserAnalyticsSaga(payload) {
  try {
    const response = yield call(getUserAnalyticsService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: actions.GET_USER_ANALYTICS_SUCCESS, customResponse });
  } catch (error) {
    yield put({ type: actions.STOP_RESULT_UI_LOADING });
  }
}
