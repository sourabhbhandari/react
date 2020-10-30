import * as ACTIONS from '../actions';

export default function(state = [], action) {
  let response = action.customResponse;
  switch (action.type) {
    case ACTIONS.GET_QUESTION_LIST_SUCCESS:
      if (response.error) {
        return [];
      } else {
        return [...response.data];
      }

    case ACTIONS.DELETE_QUESTION:
      const newQueList = state.filter(que => que.Question_Id !== action.id);
      return newQueList;
    default:
      return state;
  }
}
