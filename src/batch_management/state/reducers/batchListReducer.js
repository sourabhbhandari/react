import * as actions from '../actions/actionType';
import { Notification } from 'antd';

let initialState = {
  active: [],
  inactive: []
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
    case actions.GET_BATCH_LIST_SUCCESS:
      return {
        active: [...response.filter(item => item.Is_Active === '1')],
        inactive: [...response.filter(item => item.Is_Active === '0')]
      };
    case actions.ACTIVE_BATCH_SUCCESS:
      if (response.Message === 'Batch is now inActive...') {
        notification('info', 'Batch is now InActive');
        state.active.map(item => {
          if (item.Batch_Id === response.Batch_Id) {
            item.Is_Active = '0';
            state.inactive.push(item);
          }
        });
      }
      if (response.Message === 'Batch Is now Active...') {
        notification('success', 'Batch is now Active');
        state.inactive.map(item => {
          if (item.Batch_Id === response.Batch_Id) {
            item.Is_Active = '1';

            state.active.push(item);
          }
        });
      }
      return {
        ...state,
        inactive: [...state.inactive.filter(item => item.Is_Active === '0')],
        active: [...state.active.filter(item => item.Is_Active === '1')]
      };
    default:
      return state;
  }
}
