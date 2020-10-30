import { put, call } from 'redux-saga/effects';
import * as action from '../actions/actionTypes';
import {
  getBlogService,
  likeBlogService,
  commentBlogService,
  getBlogListService,
  getUserBLogsService,
  createBlogService,
  publishBlogService,
  getCategoryBlogService,
  recommendedBlogService
} from '../services/blogService';

export function* getBlogListSaga() {
  try {
    yield put({ type: action.LOADING_UI });
    const response = yield call(getBlogListService);
    const customResponse = response.data[0];
    yield put({ type: action.GET_ALL_BLOGS_SUCCESS, customResponse });
    yield put({ type: action.STOP_LOADING_UI });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}
export function* getCategoryBlogSaga(payload) {
  try {
    yield put({ type: action.LOADING_UI });
    const response = yield call(getCategoryBlogService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: action.GET_CATEGORY_BLOG_SUCCESS, customResponse });
    yield put({ type: action.STOP_LOADING_UI });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}
export function* getRecommendedBlogSaga(payload) {
  try {
    const response = yield call(recommendedBlogService, payload.item);
    const customResponse = response.data[0];
    debugger;
    yield put({ type: action.GET_RECOMMENDED_BLOG_SUCCESS, customResponse });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}
export function* publishBlogSaga(payload) {
  try {
    const response = yield call(publishBlogService, payload.item);
    debugger;
    const customResponse = response.data[0];
    yield put({ type: action.PUBLISH_SUCCESS, customResponse });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}
export function* getUserBlogsSaga(payload) {
  try {
    yield put({ type: action.LOADING_UI });
    debugger;
    const response = yield call(getUserBLogsService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: action.GET_USER_BLOGS_SUCCESS, customResponse });
    yield put({ type: action.STOP_LOADING_UI });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}

export function* createBlogSaga(payload) {
  try {
    debugger;
    yield put({ type: action.LOADING_UI });
    const response = yield call(createBlogService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.CREATE_BLOG_SUCCESS, customResponse });
    yield put({ type: action.STOP_LOADING_UI });
  } catch (err) {
    yield put({ type: action.SET_ERRORS, error: 'error while fetching data' });
  }
}

export function* getBlogSaga(payload) {
  try {
    yield put({ type: action.LOADING_UI });
    const response = yield call(getBlogService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_BLOG_SUCCESS, customResponse });

    yield put({ type: action.STOP_LOADING_UI });
  } catch (error) {
    yield put({ type: action.SET_ERRORS, error: 'Error while fetching data' });
  }
}
export function* likeBlogSaga(payload) {
  try {
    const response = yield call(likeBlogService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.LIKE_BLOG_SUCCESS, customResponse });
  } catch (error) {
    yield put({ type: action.SET_ERRORS, error: 'Error while fetching data' });
  }
}

export function* commentBlogSaga(payload) {
  try {
    const response = yield call(commentBlogService, payload.item);
    let customResponse = response.data;
    yield put({ type: action.COMMENT_BLOG_SUCCESS, customResponse });
  } catch (error) {
    yield put({ type: action.SET_ERRORS, error: 'Error while fetching data' });
  }
}
