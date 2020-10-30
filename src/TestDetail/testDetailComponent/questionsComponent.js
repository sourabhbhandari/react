import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkStorage } from '../../auth/utils/cookies';
import { getTestListAction } from '../state/actions/Actions';
import { getQuestionList } from '../../components/forms/questions/question-state/actions/questionActions';
import Loading from '../../components/global/loading/loading';
import TestDetails from './testDetails';

class questionsComponent extends Component {
  componentDidMount = () => {
    const user_details = checkStorage();
    const user_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;

    //this.props.getTestListAction(user_Id);
  };

  render() {
    const {
      testList: { active, inactive },
      match: { params },
      uiState: { loading }
    } = this.props;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <TestDetails
            testData={
              active.find(item => item.Test_Id === params.id) ||
              inactive.find(item => item.Test_Id === params.id)
            }
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    testState: { testList, uiState }
  } = state;
  return { testList, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getTestListAction: request => {
      dispatch(getTestListAction(request));
    },
    getQuestionList: request => {
      dispatch(getQuestionList(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(questionsComponent);
