import * as actions from '../action/actionTypes';

const initialState = {
  loading: false,
  error: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.RESULT_UI_LOADING:
      return { ...state, loading: true };
    case actions.STOP_RESULT_UI_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
}
