import { takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/actionType';
import {
  selectCategorySaga,
  categoryListSaga,
  categorySubscriptionSaga
} from './categorySaga';

export default function* categoryWatcher() {
  
  yield takeLatest(actions.CATEGORY_LIST, categoryListSaga);
  yield takeLatest(actions.SELECT_CATEGORY, selectCategorySaga);
  yield takeLatest(actions.CATEGORY_SUBSCRCRIPTION, categorySubscriptionSaga);
}
