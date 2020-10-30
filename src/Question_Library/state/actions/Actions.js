import * as actions from './actionType';

export const getQuestionLibraryAction = item => {
  return {
    type: actions.GET_QUESTION_LIBRARY,
    item
  };
};

export const sortQuestionLibraryAction = item => {
  return {
    type: actions.SORT_QUESTION_LIBRARY,
    item
  };
};

export const addQuestionToTestAction = item => {
  return {
    type: actions.ADD_QUESTION_TO_TEST,
    item
  };
};
export const selectQuestionsAction = item => {
  return {
    type: actions.SELECT_QUESTIONS,
    item
  };
};
