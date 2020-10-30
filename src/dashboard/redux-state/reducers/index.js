import { combineReducers } from 'redux';
import sider from './siderReducer';
import login from './loginReducer';

const dashboardRootReducer = combineReducers({
  sider
});

export default dashboardRootReducer;
