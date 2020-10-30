import * as actions from '../action/actionType';
export default function(state = {loading: true, data: []}, action) {
  const response = action.response;

  switch (action.type) {
    case actions.QUESTION_LIST_SUCCESS:
      return {...state, loading: false, ...response};
    case actions.QUESTION_LIST_ERROR:
      return {...state, loading: 'error', ...response};
    default:
      return state;
  }
}
