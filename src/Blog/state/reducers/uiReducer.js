import * as actions from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.LOADING_UI:
      return { ...state, loading: true };
    case actions.STOP_LOADING_UI:
      return { ...state, loading: false };
    case actions.SET_ERRORS:
      return { error: true, loading: false };
    default:
      return state;
  }
}
