//To create and update blog
import * as actions from '../actions/actionTypes';
import { Notification } from 'antd';

const initialState = {
  created: false
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.CREATE_BLOG_SUCCESS:
      Notification['success']({
        message: 'success',
        description: ' Blog is created successfully'
      });
      return { ...state, ...response, create: true };
    default:
      return state;
  }
}
