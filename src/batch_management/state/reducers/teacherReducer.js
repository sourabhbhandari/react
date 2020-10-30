import * as actions from '../actions/actionType';
import { Notification } from 'antd';

let initialState = {
  already_added: [],
  remaining: [],
  add_teacher: []
};
const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.GET_TEACHER_LIST_SUCCESS:
      return {
        ...state,
        already_added: [...response.Already_Added_Faculty_List],
        remaining: [...response.Remaining_Faculty_List]
      };
    case actions.GET_INSTITUTE_TEACHER_SUCCESS:
      return { ...state, remaining: [...response.Remaining_Faculty_List] };
    case actions.ADD_INSTITUTE_TEACHER_SUCCESS:
      notification('success', 'Teacher added successfully!!');
      return { ...state, ...response };
    case actions.DELETE_TEACHER_SUCCESS:
      notification('success', 'Teacher deleted successfully!!');
      return {
        ...state,
        remaining: [
          ...state.remaining.filter(
            item => item.Faculty_Id != response.Faculty_Id
          )
        ]
      };
    default:
      return state;
  }
}
