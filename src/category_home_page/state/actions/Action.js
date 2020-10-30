import * as actions from './actionType';

export const categoryListAction = () => {
  return {
    type: actions.CATEGORY_LIST
  };
};
export const selectCategoryAction = item => {
  return {
    type: actions.SELECT_CATEGORY,
    item
  };
};
export const categorySubscriptionAction = item => {
  return {
    type: actions.CATEGORY_SUBSCRCRIPTION,
    item
  };
};
