import * as actions from '../actions/index';

const initialState = {
  loading: false,
  error: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.QUESTION_LOADING_UI:
      return { ...state, loading: true };
    case actions.STOP_QUESTION_LOADING_UI:
      return { ...state, loading: false };
    case actions.SET_QUESTION_ERROR:
      return { error: action.error, loading: false };
    default:
      return state;
  }
}
