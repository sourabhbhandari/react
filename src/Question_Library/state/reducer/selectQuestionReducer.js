import * as actions from '../actions/actionType';

export default function(state = {status: false}, action) {
  const question_id = action.response;
  let status = false;
  switch (action.type) {
    case actions.SELECT_QUESTIONS_SUCCESS:
      if (question_id.length === 0) {
        status = false;
      } else {
        status = true;
      }
      return {status: status, question_id};
    case actions.SELECT_QUESTIONS_ERROR:
      return {status: false, question_id};
    default:
      return state;
  }
}
