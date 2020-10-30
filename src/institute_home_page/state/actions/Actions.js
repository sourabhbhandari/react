import * as actions from './actionType';

export const instituteStartAction = () => {
  return {
    type: actions.INSTITUTE_START
  };
};
export const testSeriesAction = () => {
  return {
    type: actions.TESTSERIES
  };
};
export const querySubmitAction = item => {
  return {
    type: actions.QUERY_SUBMIT,
    item
  };
};
