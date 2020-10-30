import * as actions from './actionType';

export const userRegisterAction = user => {
  return {
    type: actions.USER_REGISTER,
    user
  };
};
export const questionListAction = item => {
  return {
    type: actions.QUESTION_LIST,
    item
  };
};
export const answerSubmitAction = data => {
  return {
    type: actions.ANSWER_SUBMIT,
    data
  };
};
export const userFeedbackAction = data => {
  return {
    type: actions.USER_FEEDBACK,
    data
  };
};
export const getResultAction = item => {
  return {
    type: actions.GET_RESULT,
    item
  };
};
export const getTestLink = item => {
  return {
    type: actions.TEST_LINK,
    item
  };
};
