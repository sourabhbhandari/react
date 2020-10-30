import React, { Component } from 'react';
import { Modal, Spin, Card, List, Button, notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkStorage } from '../auth/utils/cookies';
import { addQuestionToTestAction } from './state/actions/Actions';

class testModal extends Component {
  handleInsert = id => {
    const { setModal1Visible } = this.props;
    const user_details = checkStorage();
    const user_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;
    const {
      selectQuestionsState: { status, question_id }
    } = this.props;
    const {
      questionLibraryState: { questionData }
    } = this.props;
    let Data = {};
    let Question_Category_Id = [];
    if (status) {
      question_id.map(id => {
        questionData.map(item => {
          if (item.key === id) {
            Question_Category_Id.push(item.Question_Category_Id);
          }
        });
      });
      Data = {
        Test_Id: id,
        Question_Id: question_id.toString(),
        Question_Category_Id: Question_Category_Id.toString(),
        Created_By: user_Id
      };
      this.props.addQuestionToTest(Data);
      setModal1Visible(false);
    } else {
      this.openNotification('topLeft');
      setModal1Visible(false);
    }
  };
  openNotification = placement => {
    notification.info({
      message: 'Please Select Questions from QuestionLibrary First',
      description: '',
      placement
    });
  };
  render() {
    const { modal1Visible, setModal1Visible } = this.props;
    const {
      testList: { inactive }
    } = this.props;

    return (
      <div>
        <Modal
          title="Select the Test"
          centered
          width={1200}
          footer={null}
          visible={modal1Visible}
          onOk={() => setModal1Visible(false)}
          onCancel={() => setModal1Visible(false)}
        >
          {' '}
          <Spin spinning={false}>
            <Button
              type="primary"
              style={{ marginLeft: '38%', marginBottom: '1%', width: '270px' }}
            >
              <Link to={'/dashboard/test/create'}>Create Test</Link>
            </Button>
            <div />
            <span style={{ marginLeft: '48%', marginBottom: '2%' }}>"OR"</span>
            <div style={{ marginTop: '1%' }} />
            <div className="demo-infinite-container">
              <InfiniteScroll>
                <List
                  grid={{
                    gutter: 8,
                    lg: 4
                  }}
                  dataSource={inactive}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        style={{ background: '#F0F6F7FF', textAlign: 'center' }}
                      >
                        {item.Test_Name}
                        <br />
                        <Button
                          type="primary"
                          onClick={() => this.handleInsert(item.Test_Id)}
                        >
                          Insert
                        </Button>
                      </Card>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Spin>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    testState: { testList },
    libraryState: { questionLibraryState, selectQuestionsState }
  } = state;
  return {
    testList,
    questionLibraryState,
    selectQuestionsState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addQuestionToTest: item => {
      dispatch(addQuestionToTestAction(item));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(testModal);
