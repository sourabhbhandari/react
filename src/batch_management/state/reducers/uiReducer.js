import * as actions from '../actions/actionType';

const initialState = {
  loading: false,
  error: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.BATCH_LOADING_UI:
      return { ...state, loading: true };
    case actions.STOP_BATCH_LOADING_UI:
      return { ...state, loading: false };
    case actions.SET_BATCH_ERRORS:
      return { error: true, loading: false };
    default:
      return state;
  }
}
