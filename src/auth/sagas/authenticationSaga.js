import { put, call } from 'redux-saga/effects';
import {
  registerUserService,
  loginUserService
} from '../services/authenticationService';

import * as types from '../actions';
import { setStorage } from '../utils/cookies';

export function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload.user);
    yield put({ type: types.REGISTER_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload.user);
    const user_details = response.data;
    setStorage('user', {
      ...payload.user,
      isGoogle: false,
      isLoggedIn: true,
      ...user_details.User_Details
    });
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error });
  }
}

export function* loginWithGoogleSaga(payload) {
  try {
    let user = { id_Token: payload.user.id_token };
    // const user = yield call(registerUserService);
    const response = yield call(registerUserService, user);
    setStorage('user', { ...payload.user, isLoggedIn: true, ...response.data });

    yield put({ type: types.LOGIN_USER_WITH_GOOGLE_SUCCESS, user });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_WITH_GOOGLE_ERROR, error });
  }
}
