import * as actions from '../actions/actionType';
import { Notification } from 'antd';

let initialState = {
  already_added: [],
  remaining: [],
  add_subject: []
};
const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  debugger;
  switch (action.type) {
    case actions.GET_SUBJECT_LIST_SUCCESS:
      return {
        ...state,
        already_added: [...response.Already_Added_Subject_List],
        remaining: [...response.Remaining_Subject_List]
      };
    case actions.ADD_SUBJECT_SUCCESS:
      if (response.Message === 'Faculty  Added Successfully....') {
        notification('success', 'Faculty  Added Successfully....');
      } else {
        notification('success', 'Subject Added successfully!!');
      }
      return { ...state, already_added: [...state.already_added, ...response] };
    case actions.DELETE_SUBJECT_SUCCESS:
      notification('success', 'Subject Removed successfully!!');
      return {
        ...state,
        already_added: [
          ...state.already_added.filter(
            item => item.Subject_Id !== response.Subject_Id
          )
        ]
      };
    case actions.DELETE_SUBJECT_FACULTY_SUCCESS:
      if (response.response.Message === 'Faculty is now inActive...') {
        notification('info', 'Faculty Removed successfully!!');
        state.already_added.map(item => {
          if (item.Subject_Id === response.Subject_Id) {
            item.facultyList = item.facultyList.filter(
              faculty => faculty.Faculty_Id !== response.response.Faculty_Id
            );
          }
        });
      }

      return { ...state };
    default:
      return state;
  }
}
