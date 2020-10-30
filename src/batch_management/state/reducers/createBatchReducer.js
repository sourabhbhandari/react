import * as actions from '../actions/actionType';
import { Notification } from 'antd';

let initialState = {
  Category: [],
  response: []
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
    case actions.CREATE_BATCH_SUCCESS:
      if (response.Message === 'Batch Added Successfully...') {
        notification('success', 'Batch created successfully');
      } else {
        notification('success', 'Batch updated successfully');
      }
      return { ...state, response };
    case actions.GET_BATCH_CATEGORY_LIST_SUCCESS:
      response.map(item => {
        state.Category.push({
          value: item.Category_Id,
          label: item.Category_Name,
          isLeaf: false,
          subCategory: item.subCategory
        });
      });
      return { ...state };
    default:
      return state;
  }
}
