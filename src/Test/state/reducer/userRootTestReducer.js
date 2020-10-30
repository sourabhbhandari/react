import { combineReducers } from 'redux';
import userRegisterReducer from '../reducer/userRegisterReducer';
import questionListReducer from './questionListReducer';
import userAnswerSubmitReducer from './userAnswerSubmitReducer';
import getResultReducer from './getResultReducer';
import userFeedbackReducer from './userFeedbackReducer';
import uiReducer from './uiReducer';

const userRootTestReducer = combineReducers({
  userRegisterState: userRegisterReducer,
  userAnswerState: userAnswerSubmitReducer,
  userQuestionListState: questionListReducer,
  userResultState: getResultReducer,
  userFeedbackState: userFeedbackReducer,
  uiState: uiReducer
});

export default userRootTestReducer;
