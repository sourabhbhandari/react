import * as actions from '../actions/actionType';
import { Notification } from 'antd';

const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};
export default function(state = [], action) {
  const response = action.customResponse;

  switch (action.type) {
    case actions.GET_ASSIGNMENT_LIST_SUCCESS:
      return [...response.Assignment_List];

    case actions.CREATE_ASSIGNMENT_SUCCESS:
      notification('success', 'Assignment created successfully');
      return [...state];
    case actions.DELETE_ASSIGNMENT_SUCCESS:
      notification('success', 'Assignment deleted successfully');
      return [
        ...state.filter(item => item.Assignment_Id !== response.Assignment_Id)
      ];
    case actions.UPDATE_ASSIGNMENT_SUCCESS:
      notification('success', 'Assignment assigned successfully');
      return [...state];
    default:
      return state;
  }
}
