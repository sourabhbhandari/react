import { combineReducers } from 'redux';
import getBlogReducer from './getBlogReducer';
import uiReducer from './uiReducer';
import blogListReducer from './blogListReducer';
import createBlogReducer from './createBlogReducer';

const blogRootReducer = combineReducers({
  blogState: getBlogReducer,
  addBlogState: createBlogReducer,
  blogListState: blogListReducer,
  uiState: uiReducer
});
export default blogRootReducer;
