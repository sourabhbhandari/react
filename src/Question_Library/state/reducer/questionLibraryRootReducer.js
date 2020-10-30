import { combineReducers } from 'redux';
import getQuestionLibraryReducer from './getQuestionLibraryReducer';
import sortQuestionLibraryReducer from './sortQuestionLibraryReducer';
import selectQuestionReducer from './selectQuestionReducer';
import addQuestionsReducer from './addQuestionsReducer';

const questionLibraryRootReducer = combineReducers({
  questionLibraryState: getQuestionLibraryReducer,
  sortQuestionState: sortQuestionLibraryReducer,
  selectQuestionsState: selectQuestionReducer,
  addQuestionState: addQuestionsReducer
});

export default questionLibraryRootReducer;
