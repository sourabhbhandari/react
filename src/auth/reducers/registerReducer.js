import * as types from '../actions';

function generateDefaultInitialRegisterState() {
  return {username: '', password: ''};
}

export default function(state = generateDefaultInitialRegisterState(), action) {
  let response = action.user;
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return {...state, ...response};
    case types.REGISTER_USER_ERROR:
      return {...state};
    default:
      return state;
  }
}
