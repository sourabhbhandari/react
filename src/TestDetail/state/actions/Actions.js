import * as actions from './actionType';

export const addTestAction = item => {
  return {
    type: actions.ADD_TEST,
    item
  };
};

export const deleteTestAction = item => {
  return {
    type: actions.DELETE_TEST,
    item
  };
};
export const editTestAction = item => {
  return {
    type: actions.EDIT_TEST,
    item
  };
};
export const publishTest = item => {
  return {
    type: actions.PUBLISH_TEST,
    item
  };
};
export const getTestListAction = User_Id => {
  return {
    type: actions.GET_TEST_LIST,
    User_Id
  };
};
export const getTestAnalyticsAction = item => {
  return {
    type: actions.GET_TEST_ANALYTICS,
    item
  };
};
export const getAttemptListAction = item => {
  return {
    type: actions.GET_ATTEMPT_LIST,
    item
  };
};
