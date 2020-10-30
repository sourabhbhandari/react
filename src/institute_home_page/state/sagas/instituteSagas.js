import { put, call } from 'redux-saga/effects';
import { seriesData } from '../../body/seriesData';
import {
  instituteService,
  instituteDetailService,
  querySubmitService
} from '../services/instituteServices';
import * as actions from '../actions/actionType';

export function* instituteStartSaga() {
  try {
    const response = yield call(instituteService);
    yield put({ type: actions.INSTITUTE_START_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.INSTITUTE_START_ERROR, error });
  }
}
export function* instituteSaga() {
  try {
    const response = yield call(instituteDetailService);
    yield put({ type: actions.TESTSERIES_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.TESTSERIES_ERROR, error });
  }
}
export function* querySubmitSaga(payload) {
  try {
    const response = yield call(querySubmitService, payload.item);
    yield put({ type: actions.QUERY_SUBMIT_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.QUERY_SUBMIT_ERROR, error });
  }
}
