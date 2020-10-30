import * as actions from '../actions/actionType';

export default function(state = [], action) {
  const response = action.response;

  switch (action.type) {
    case actions.TESTSERIES_SUCCESS:
      return {...state, ...response};
    case actions.TESTSERIES_ERROR:
      return {...state, ...response};
    default:
      return state;
  }
}
