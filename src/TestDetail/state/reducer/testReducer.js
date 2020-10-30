import { combineReducers } from 'redux';
import createTestReducer from './createTestReducer';
import getTestListReducer from './getTestListReducer';
import scoreCardReducer from './scoreCardReducer';
import uiReducer from './uiReducer';

const testRootReducer = combineReducers({
  testList: getTestListReducer,
  addTestList: createTestReducer,
  scoreCardState: scoreCardReducer,
  uiState: uiReducer
});

export default testRootReducer;
