import * as actions from '../actions/actionType';
import {Notification} from 'antd';

export default function(state = {status: false}, action) {
  const response = action.response;
  switch (action.type) {
    case actions.ADD_QUESTION_TO_TEST_SUCCESS:
      if (response.status) {
        Notification['success']({
          message: 'success',
          description: 'Question added successfully',
        });
      } else {
        Notification['error']({
          message: 'Error',
          description: 'Question already added to the test',
        });
      }

      return {...state, ...response};

    case actions.ADD_QUESTION_TO_TEST_ERROR:
      Notification['error']({
        message: 'Error',
        description: ' Questions is not added',
      });
      return {...state, ...action.response};
    default:
      return state;
  }
}
