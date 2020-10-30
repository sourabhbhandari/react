import * as actions from '../actions/actionType';

export default function(state = {status: false}, action) {
  let response = action.response;
  switch (action.type) {
    case actions.CATEGORY_SUBSCRCRIPTION_SUCCESS:
      return {...state, ...response};
    case actions.CATEGORY_SUBSCRIPTION_ERROR:
      return state;
    default:
      return state;
  }
}
