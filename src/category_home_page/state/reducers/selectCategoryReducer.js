import * as actions from '../actions/actionType';

export default function(state = {status: false}, action) {
  let response = action.response;

  switch (action.type) {
    case actions.SELECT_CATEGORY_SUCCESS:
      return {...state, ...response};
    case actions.SELECT_CATEGORY_ERROR:
      return {...state, ...response};
    default:
      return state;
  }
}
