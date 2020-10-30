import * as types from './index';

export const registerUserAction = user => {
  return {
    type: types.REGISTER_USER,
    user
  };
};

export const loginUserAction = user => {
  return {
    type: types.LOGIN_USER,
    user
  };
};

export const loginWithGoogleUserAction = user => {
  return {
    type: types.LOGIN_USER_WITH_GOOGLE,
    user
  };
};

export const logoutUserAction = () => {
  return {
    type: types.LOGOUT_USER
  };
};
