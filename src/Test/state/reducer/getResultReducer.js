import * as actions from '../action/actionType';

export default function(state = {status: false}, action) {
  switch (action.type) {
    case actions.GET_RESULT_SUCCESS:
      return {...state, ...action.customResponse};
    case actions.GET_RESULT_ERROR:
      return [...state, action.response];
    default:
      return state;
  }
}
