import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Descriptions, Rate, Button, Spin } from 'antd';
import { enquireScreen } from 'enquire-js';
import Questions from '../../components/forms/questions/question_list';
import { getQuestionList } from '../../components/forms/questions/question-state/actions/questionActions';
import { checkStorage } from '../../auth/utils/cookies';
import { questionData } from '../../components/forms/questions/question_data';
import Loading from '../../components/global/loading/loading';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class testDetails extends Component {
  componentDidMount() {
    const { testData } = this.props;
    let user = checkStorage();
    let payload = {
      TestId: testData.Test_Id,
      User_Id: user.User_Id
    };
    this.props.getQuestionList(payload);
  }
  render() {
    const { testData, questionList, loading } = this.props;

    return (
      <div>
        <p
          style={{
            fontWeight: '600',
            marginBottom: '1%',
            color: '#000',
            fontSize: '22px'
          }}
        >
          Test Details
        </p>
        <Descriptions layout={isMobile ? 'vertical' : ''} bordered size="small">
          <Descriptions.Item label="Test Name">
            {testData.Test_Name}
          </Descriptions.Item>
          <Descriptions.Item label="Creator of Test">
            {testData.Created_By}
          </Descriptions.Item>
          <Descriptions.Item label=" Questions remain to add">
            <span
              style={{
                fontWeight: '700',
                color:
                  testData.Number_Of_Questions -
                    testData.Number_Of_Questions_Added >
                  0
                    ? 'red'
                    : 'green'
              }}
            >
              {testData.Number_Of_Questions -
                testData.Number_Of_Questions_Added}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label="Number Of Attempt Allowed">
            {testData.No_Of_Attempt}
          </Descriptions.Item>
          <Descriptions.Item label="Total Marks">
            {testData.Total_Marks}
          </Descriptions.Item>
          <Descriptions.Item label=" Questions Already Added">
            {testData.Number_Of_Questions_Added}
          </Descriptions.Item>
          <Descriptions.Item label="Negative Marks">
            {testData.Negative_Margin === '0.0'
              ? testData.Negative_Margin
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Result Declaration">
            {testData.Result_Declaration}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {testData.Test_Difficulty_Level}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {testData.Test_Description}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled defaultValue={testData.Test_Rating} />
          </Descriptions.Item>
        </Descriptions>

        {testData.Number_Of_Questions_Added === testData.Number_Of_Questions ||
        testData.Is_Link_Active === '1' ? null : (
          <div style={{ margin: 'auto auto auto 33%' }}>
            {' '}
            <Link to={`/dashboard/questionlibrary/${testData.Test_Id}`}>
              <Button type="primary" ghost size="large">
                Add Questions From Library
              </Button>
            </Link>
            <Link to={`/dashboard/test/${testData.Test_Id}/question/create`}>
              <Button type="primary" ghost size="large">
                Create Questions Manually
              </Button>
            </Link>
          </div>
        )}

        <Spin spinning={loading}>
          <Questions
            questionList={questionList}
            active={testData.Is_Link_Active}
          />
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    questionState: {
      questionList,
      loaderState: { loading }
    }
  } = state;
  return { questionList, loading };
};
const mapDispatchToProps = dispatch => {
  return {
    getQuestionList: request => {
      dispatch(getQuestionList(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(testDetails);
