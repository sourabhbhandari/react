import * as ACTIONS from './index';

const pendingStatus = true;
export const getQuestionList = item => {
  return {
    type: ACTIONS.GET_QUESTION_LIST,
    item
  };
};

export const deleteQuestion = questionId => {
  return {
    type: ACTIONS.DELETE_QUESTION,
    id: questionId
  };
};

export const isQuestionListPending = () => {
  return { type: ACTIONS.IS_GET_QUESTION_LIST_PENDING, pendingStatus };
};

export const addQuestionAction = item => {
  return {
    type: ACTIONS.ADD_QUESTION,
    item
  };
};

export const editQuestionAction = item => {
  return {
    type: ACTIONS.EDIT_QUESTION,
    item
  };
};
