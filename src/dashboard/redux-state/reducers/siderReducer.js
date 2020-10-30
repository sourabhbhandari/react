import * as ACTIONS from '../actions/actionConstants';

function generateDefaultInitialCollapsedState() {
  return {collapsed: true};
}

export default function(
  state = generateDefaultInitialCollapsedState(),
  action
) {
  let collapsed = action.collapsed;

  switch (action.type) {
    case ACTIONS.CLICK_FOLD_MENU:
      return {...state, collapsed};
    default:
      return state;
  }
}
