import { combineReducers } from 'redux';
import authRootReducer from './auth/reducers';
import dashboardRootReducer from './dashboard/redux-state/reducers';
import questionRootReducer from './components/forms/questions/question-state/reducers';
import testRootReducer from './TestDetail/state/reducer/testReducer';
import instituteRootReducer from '../src/institute_home_page/state/reducer/instituteRootReducer';
import userRootTestReducer from './Test/state/reducer/userRootTestReducer';
import categoryRootReducer from './category_home_page/state/reducers';
import questionLibraryRootReducer from './Question_Library/state/reducer/questionLibraryRootReducer';
import blogRootReducer from './Blog/state/reducers/blogRootReducer';
import batchRootReducer from './batch_management/state/reducers/batchRootReducer';
import resultRootReducer from './result/state/reducer/resultRootReducer';

const reducers = {
  authState: authRootReducer,
  dashboardState: dashboardRootReducer,
  questionState: questionRootReducer,
  testState: testRootReducer,
  instituteState: instituteRootReducer,
  userTestState: userRootTestReducer,
  categoryState: categoryRootReducer,
  libraryState: questionLibraryRootReducer,
  blogsState: blogRootReducer,
  batchState: batchRootReducer,
  resultState: resultRootReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
