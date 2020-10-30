import { combineReducers } from 'redux';
import getResultReducer from './getResultReducer';
import uiReducer from './uiReducer';

const testRootReducer = combineReducers({
  userInfo: getResultReducer,
  uiState: uiReducer
});

export default testRootReducer;
