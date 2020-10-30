import { takeLatest } from 'redux-saga/effects';
import * as action from '../actions/actionTypes';
import {
  getBlogSaga,
  likeBlogSaga,
  commentBlogSaga,
  getBlogListSaga,
  getUserBlogsSaga,
  publishBlogSaga,
  createBlogSaga,
  getRecommendedBlogSaga,
  getCategoryBlogSaga
} from './blogSaga';

export default function* blogWatcher() {
  yield takeLatest(action.GET_ALL_BLOGS, getBlogListSaga);
  yield takeLatest(action.GET_USER_BLOGS, getUserBlogsSaga);
  yield takeLatest(action.CREATE_BLOG, createBlogSaga);
  yield takeLatest(action.GET_BLOG, getBlogSaga);
  yield takeLatest(action.LIKE_BLOG, likeBlogSaga);
  yield takeLatest(action.COMMENT_BLOG, commentBlogSaga);
  yield takeLatest(action.PUBLISH, publishBlogSaga);
  yield takeLatest(action.GET_RECOMMENDED_BLOG, getRecommendedBlogSaga);
  yield takeLatest(action.GET_CATEGORY_BLOG, getCategoryBlogSaga);
}
