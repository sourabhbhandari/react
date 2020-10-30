import { combineReducers } from 'redux';
import selectCategoryReducer from './selectCategoryReducer';
import categoryListReducer from './categoryListReducer';
import categorySubscriptionReducer from './categorySubscriptionReducer';
import uiReducer from './uiReducer';

const categoryRootReducer = combineReducers({
  selectCategoryState: selectCategoryReducer,
  categoryListState: categoryListReducer,
  categorySubscriptionState: categorySubscriptionReducer,
  uiState: uiReducer
});
export default categoryRootReducer;
