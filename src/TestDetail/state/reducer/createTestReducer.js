import * as actions from '../actions/actionType';
import { Notification } from 'antd';

const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};

export default function(state = {}, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.ADD_SUCCESS:
      notification('success', 'Test added successfully');
      return { response, Message: 'success' };

    case actions.EDIT_SUCCESS:
      notification('success', ' Test updated successfully');
      return { response, Message: 'success' };

    default:
      return state;
  }
}
