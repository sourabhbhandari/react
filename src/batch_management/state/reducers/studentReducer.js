import * as actions from '../actions/actionType';
import { Notification } from 'antd';

let initialState = {
  already_added: [],
  remaining: [],
  add_student: []
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
    case actions.GET_STUDENT_LIST_SUCCESS:
      return {
        ...state,
        already_added: [...response.Already_Added_Student_List],
        remaining: [...response.Remaining_Student_List]
      };
    case actions.GET_ALL_STUDENT_SUCCESS:
      return { ...state, remaining: [...response.Remaining_Student_List] };
    case actions.ADD_STUDENT_SUCCESS:
      notification('success', 'Student Added successfully!!');
      return { ...state };
    case actions.ADD_INSTITUTE_STUDENT_SUCCESS:
      notification('success', 'Student added successfully!!');
      return { ...state, ...response };
    case actions.DELETE_STUDENT_SUCCESS:
      if (response.Message === 'Student is now inActive...') {
        notification('success', ' Student deleted successfully!!');
        return {
          ...state,
          already_added: [
            ...state.already_added.filter(
              item => item.Student_Id !== response.Student_Id
            )
          ]
        };
      } else {
        return {
          ...state,
          remaining: [
            ...state.remaining.filter(
              item => item.Student_Id != response.Student_Id
            )
          ]
        };
      }

    default:
      return state;
  }
}
