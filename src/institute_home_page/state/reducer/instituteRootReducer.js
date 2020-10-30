import { combineReducers } from 'redux';
import instituteReducer from './instituteReducer';
import testSeriesReducer from './testSeriesReducer';
import querySubmitReducer from './querySubmitReducer';

const instituteRootReducer = combineReducers({
  testSeriesState: instituteReducer,
  instituteDetailState: testSeriesReducer,
  querySubmitState: querySubmitReducer
});

export default instituteRootReducer;
