import * as actions from './actionTypes';

export const getResultAction = item => {
  return {
    type: actions.GET_USER_RESULT,
    item
  };
};
export const getUserAnalyticsAction = item => {
  return {
    type: actions.GET_USER_ANALYTICS,
    item
  };
};
