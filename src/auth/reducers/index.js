import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';

const reducers = {
  register,
  login
};
const authRootReducer = combineReducers(reducers);

export default authRootReducer;
