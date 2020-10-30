import * as ACTIONS from '../actionConstants';

export const sideMenuClickAction = collapsed => {
  return {
    type: ACTIONS.CLICK_FOLD_MENU,
    collapsed
  };
};
