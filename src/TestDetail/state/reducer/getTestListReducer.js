import * as actions from '../actions/actionType';
import { Notification } from 'antd';

const notification = (type, message) => {
  Notification[type]({
    message: type,
    description: message
  });
};

let initialState = {
  active: [],
  inactive: [],
  attempted: []
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.GET_TEST_LIST_SUCCESS:
      return {
        active: [
          ...response.Test_Created_by_User.filter(
            item => item.Is_Link_Active === '1'
          )
        ],
        inactive: [
          ...response.Test_Created_by_User.filter(
            item => item.Is_Link_Active === '0'
          )
        ],
        attempted: [...response.Test_Attempted_by_User]
      };
    case actions.PUBLISH_TEST_SUCCESS:
      if (response[0].message === 'Test Is now unPublished') {
        notification('info', 'Test Is now unPublished');
        state.active.map(item => {
          if (item.Test_Id === response[1].Test_Id) {
            item.Is_Link_Active = '0';
            state.inactive = [...state.inactive, item];
          }
        });
      }
      if (response[0].message === 'Test Is now Published') {
        notification('success', 'Test Is now Published');
        state.inactive.map(item => {
          if (item.Test_Id === response[1].Test_Id) {
            item.Is_Link_Active = '1';
            state.active = [...state.active, item];
          }
        });
      }
      return {
        inactive: [
          ...state.inactive.filter(item => item.Is_Link_Active === '0')
        ],
        active: [...state.active.filter(item => item.Is_Link_Active === '1')]
      };
    case actions.DELETE_SUCCESS:
      if (response.message === 'Test is now InActive...') {
        notification('info', 'Test is now InActive...');
      }
      return {
        inactive: [
          ...state.inactive.filter(item => item.Test_Id !== response.Test_Id)
        ],
        active: [
          ...state.active.filter(item => item.Test_Id !== response.Test_Id)
        ]
      };
    default:
      return state;
  }
}
