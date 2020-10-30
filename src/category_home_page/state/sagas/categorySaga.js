import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/actionType';
import { Data } from '../../components/data';
import {
  selectCategoryService,
  categoryListService,
  categorySubscriptionService
} from '../service/categoryService';

export function* selectCategorySaga(payload) {
  try {
    let id = parseInt(payload.item);
    const response = yield call(selectCategoryService, id);

    yield put({ type: actions.SELECT_CATEGORY_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.SELECT_CATEGORY_ERROR, error });
  }
}
export function* categoryListSaga() {
  try {
    yield put({ type: actions.CATEGORY_LOADING_UI });
    const response = yield call(categoryListService);
    const customResponse = response.data;
    yield put({ type: actions.CATEGORY_LIST_SUCCESS, customResponse });
    yield put({ type: actions.STOP_CATEGORY_LOADING_UI });
  } catch (error) {
    yield put({
      type: actions.SET_CATEGORY_ERROR,
      error: 'Error occurs while performing action'
    });
  }
}
export function* categorySubscriptionSaga(payload) {
  try {
    const response = yield call(categorySubscriptionService, payload.item);
    yield put({ type: actions.CATEGORY_SUBSCRCRIPTION_SUCCESS, response });
  } catch (error) {
    yield put({ type: actions.CATEGORY_SUBSCRIPTION_ERROR, error });
  }
}
