import React, { Component } from 'react';
import { Select, Result, Button, Empty } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';

import { checkStorage } from '../../../auth/utils/cookies';
import QuestionList from './question_list';
import { getTestListAction } from '../../../TestDetail/state/actions/Actions';
import { getQuestionList } from '../../../components/forms/questions/question-state/actions/questionActions';
import Loading from '../../global/loading/loading';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
const { Option } = Select;

class SelectTest extends Component {
  state = {
    Test_Id: null,
    loading: false,
    SelectTest: ''
  };
  componentDidMount() {
    const user_details = checkStorage();
    const User_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;
    this.props.getTestListAction(User_Id);
    const {
      match: { params }
    } = this.props;
    if (params.id) {
      const payload = { TestId: params.id, User_Id: User_Id.toString() };
      this.setState({ loading: true, SelectTest: params.name });
      this.props.getQuestionListAction(payload);
    }
  }
  handleSelect = TestId => {
    const user_details = checkStorage();
    const User_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;
    this.setState({ loading: true, SelectTest: TestId[1] });

    const payload = { TestId: TestId[0], User_Id: User_Id.toString() };
    this.props.getQuestionListAction(payload);
    this.props.history.push(
      `/dashboard/question/list/${TestId[0]}/${TestId[1]}`
    );
  };

  render() {
    const { testList, questionList } = this.props;
    const {
      match: { params }
    } = this.props;

    return (
      <div>
        <Select
          onSelect={this.handleSelect}
          placeholder="Please select a Test Name from List"
          value={this.state.SelectTest}
          style={{
            width: isMobile ? '90%' : '60%',
            marginTop: '2%',
            marginBottom: '2%',
            marginLeft: isMobile ? '5%' : '20%'
          }}
        >
          {testList
            ? testList.map(test => (
                <Option value={[test.Test_Id, test.Test_Name]}>
                  {test.Test_Name}
                </Option>
              ))
            : ''}
        </Select>

        <br />

        {this.state.loading ? (
          questionList.loading ? (
            <Loading />
          ) : params.id ? (
            questionList.status ? (
              <>
                <h2 style={{ marginBottom: '10px' }}>
                  Test Name:-{' '}
                  <span style={{ fontSize: '18px' }}>
                    {this.state.SelectTest}
                  </span>
                </h2>
                <QuestionList questionList={questionList} />
              </>
            ) : (
              <>
                <Empty description="No Questions in this test .Please add some!! " />

                <Link to={`/dashboard/question/create/${params.id}`}>
                  {' '}
                  <Button type="primary" style={{ marginLeft: '35%' }}>
                    Create Questions
                  </Button>
                </Link>
                <Link to={`/dashboard/questionlibrary/${params.id}`}>
                  <Button type="primary">Add Questions from library</Button>
                </Link>
              </>
            )
          ) : (
            ''
          )
        ) : (
          <Result
            title={
              <>
                "Please Select the Test Name "<br /> "OR"
              </>
            }
            extra={
              <Button type="primary" key="console">
                <Link to={'/dashboard/test/create'}>Create Test</Link>
              </Button>
            }
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    testState: { testList },
    questionState: { questionList }
  } = state;
  return {
    testList,
    questionList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getQuestionListAction: payload => {
      dispatch(getQuestionList(payload));
    },
    getTestListAction: User_Id => {
      dispatch(getTestListAction(User_Id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
