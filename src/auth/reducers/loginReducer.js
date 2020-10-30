import * as types from '../actions';
import {signout} from '../../auth/utils/cookies';
function generateDefaultInitialLoginState() {
  return {
    isLoggedIn: false,
    isLoggedInWithGoogle: false,
    token: '',
    username: '',
    email: '',
    remember: true,
  };
}

function generateAuthenticatedLoginState() {
  return {
    isLoggedIn: true,
    isLoggedInWithGoogle: false,
    token: '',
    username: '',
    email: '',
    remember: true,
  };
}

export default function(state = generateDefaultInitialLoginState(), action) {
  let response = action.response;

  switch (action.type) {
    case types.LOGIN_USER_WITH_GOOGLE_SUCCESS:
      response = {
        isLoggedIn: true,
        isLoggedInWithGoogle: true,
        token: action.user.id_token,
        username: '',
        Email_Id: action.user.email,
        remember: true,
        imageUrl: action.user.imageUrl,
        fullName: action.user.fullName,
      };
      return {...state, ...response};
    case types.LOGOUT_USER:
      signout();
      return generateDefaultInitialLoginState();
    case types.LOGIN_USER_ERROR:
      return {...state, ...response};
    case types.LOGIN_USER_SUCCESS:
      return {...generateAuthenticatedLoginState(), ...response};
    default:
      return state;
  }
}
