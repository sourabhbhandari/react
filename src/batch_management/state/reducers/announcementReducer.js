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
    case actions.GET_ANNOUNCEMENT_LIST_SUCCESS:
      return [...response.Announcement_List];

    case actions.CREATE_ANNOUNCEMENT_SUCCESS:
      notification('success', 'Announcement created successfully');
      return [...state];
    case actions.DELETE_ANNOUNCEMENT_SUCCESS:
      notification('success', 'Announcement deleted successfully');
      return [
        ...state.filter(
          item => item.Announcement_Id !== response.Announcement_Id
        )
      ];
    case actions.UPDATE_ANNOUNCEMENT_SUCCESS:
      notification('success', 'Updated successfully');
      return [...state];
    default:
      return state;
  }
}
