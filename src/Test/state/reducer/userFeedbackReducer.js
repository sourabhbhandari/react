import * as actions from '../action/actionType';

export default function(state = {status: false}, action) {
  switch (action.type) {
    case actions.USER_FEEDBACK_SUCCESS:
      return {...state, ...action.response};
    case actions.USER_FEEDBACK_ERROR:
      return {...state, ...action.response};
    default:
      return state;
  }
}
