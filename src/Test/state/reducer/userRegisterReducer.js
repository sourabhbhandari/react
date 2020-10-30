import * as actions from '../action/actionType';
import { Notification } from 'antd';

const openNotificationWithIcon = (type = '', title = '', desc = '') => {
  Notification[type]({
    message: title,
    description: desc
  });
};

let initialState = {
  testId: null,
  userRegister: null
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.USER_REGISTER_SUCCESS:
      openNotificationWithIcon(
        'success',
        'success',
        'Registered for exam successfully'
      );
      return { ...state, userRegister: response.Message };
    case actions.TEST_LINK_SUCCESS:
      return { ...state, testId: response.Test_Id };
    default:
      return state;
  }
}
