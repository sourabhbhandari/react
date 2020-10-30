import * as actions from '../actions/actionType';

export default function(state = [], action) {
  const response = action.response;

  switch (action.type) {
    case actions.INSTITUTE_START_SUCCESS:
      return {...state, ...response};
    case actions.INSTITUTE_START_ERROR:
      return {...state, ...response};
    default:
      return state;
  }
}
