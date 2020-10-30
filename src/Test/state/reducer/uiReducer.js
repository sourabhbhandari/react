import * as actions from '../action/actionType';
import { Notification } from 'antd';

const openNotificationWithIcon = (type = '', desc = '') => {
  Notification[type]({
    message: desc
  });
};
const initialState = {
  loading: false,
  error: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actions.EXAM_LOADING_UI:
      return { ...state, loading: true };
    case actions.STOP_EXAM_LOADING_UI:
      return { ...state, loading: false };
    case actions.SET_EXAM_ERROR:
      openNotificationWithIcon('info', action.error);
      return { error: action.error, loading: false };
    default:
      return state;
  }
}
