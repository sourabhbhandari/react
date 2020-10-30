import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTestListAction } from '../TestDetail/state/actions/Actions';
import {
  getUserAnalyticsAction,
  getResultAction
} from './state/action/actions';
import UserOverview from './components/userOverview';
import Loading from '../components/global/loading/loading';
import { checkStorage } from '../auth/utils/cookies';

class result extends Component {
  componentDidMount() {
    const user = checkStorage();
    this.props.getTestList(user.User_Id);
    this.props.getUserAnalytics(user.User_Id);
  }
  render() {
    const {
      uiState: { loading }
    } = this.props;
    return <div>{loading ? <Loading /> : <UserOverview />}</div>;
  }
}
const mapStateToProps = state => {
  const {
    resultState: { uiState }
  } = state;
  return { uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getTestList: request => {
      dispatch(getTestListAction(request));
    },
    getUserAnalytics: request => {
      dispatch(getUserAnalyticsAction(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(result);
