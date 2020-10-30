import * as actions from '../actions/actionType';

export default function(state = [], action) {
  let response = action.customResponse;
  switch (action.type) {
    case actions.CATEGORY_LIST_SUCCESS:
      return [...response];
    default:
      return state;
  }
}
