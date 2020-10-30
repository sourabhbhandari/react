import * as actions from '../actions/actionType';

export default function(state = [], action) {
  const response = action.response;

  switch (action.type) {
    case actions.QUERY_SUBMIT_SUCCESS:
      return [...state, ...response];
    case actions.QUERY_SUBMIT_ERROR:
      return [...state, ...response];
    default:
      return state;
  }
}
