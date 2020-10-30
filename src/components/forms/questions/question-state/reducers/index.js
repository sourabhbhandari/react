import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import addQuestionReducer from './addQuestionReducer';
import loaderReducer from './loaderReducer';

const questionRootReducer = combineReducers({
  questionList: questionReducer,
  addQuestionList: addQuestionReducer,
  loaderState: loaderReducer
});

export default questionRootReducer;
