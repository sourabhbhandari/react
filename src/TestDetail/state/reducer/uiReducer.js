import * as actions from '../actions/actionType';
import { Notification } from 'antd';

const initialState = {
  loading: false,
  error: false
};
const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.TEST_LOADING_UI:
      return { ...state, loading: true };
    case actions.STOP_TEST_LOADING_UI:
      return { ...state, loading: false };
    case actions.SET_TEST_ERROR:
      notification('error', 'Error occurs while performing actions');
      return { loading: false, error: action.error };
    default:
      return state;
  }
}
