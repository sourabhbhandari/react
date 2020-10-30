import * as ACTIONS from '../actions';
import { Notification } from 'antd';

export default function(state = [], action) {
  let response = action.response;
  state.loading = true;
  const openNotificationWithIcon = (type = '', title = '', desc = '') => {
    Notification[type]({
      message: title,
      description: desc
    });
  };
  switch (action.type) {
    case ACTIONS.ADD_QUESTION_SUCCESS:
      openNotificationWithIcon(
        'success',
        'success',
        'Question added successfully'
      );
      return [...response];
    // case ACTIONS.ADD_QUESTION_ERROR:
    //   openNotificationWithIcon('error', 'Error', 'Question is not added');
    //   return [...state];
    case ACTIONS.EDIT_QUESTION_SUCCESS:
      openNotificationWithIcon(
        'success',
        'success',
        ' Question is  updated successfully'
      );

      return [...response];
    // case ACTIONS.EDIT_QUESTION_ERROR:
    //   openNotificationWithIcon('error', 'Error', 'Question is not updated');
    //   return [...state];
    default:
      return state;
  }
}
