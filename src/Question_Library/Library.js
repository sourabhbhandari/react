import React, { Component } from 'react';
import QuestionTable from './questionTable/Table';
import Filters from './Filter';
import {
  getQuestionLibraryAction,
  addQuestionToTestAction
} from './state/actions/Actions';
import { getTestListAction } from '../TestDetail/state/actions/Actions';
import { checkStorage } from '../auth/utils/cookies';
import { Row, Dropdown, Col, Menu, Icon, Button, notification } from 'antd';
import { connect } from 'react-redux';
import Auto from './autoComplete';
import TestModal from './testModal';

class Library extends Component {
  state = {
    modal1Visible: false
  };

  filter = {
    Page_Size: '30',
    Page_No: '1',
    Categories: '5,6,7',
    Question_Difficulty_Level: '0,1,2',
    Question_Type: '0,1,2',
    Marks_Range: '0,10'
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    if (params.id) {
      this.filter['Test_Id'] = params.id;
    }
    this.props.getQuestionLibrary(this.filter);
  }
  onPageChange = page => {
    if (parseInt(30 / 10) + 1 > page) {
      this.filter.Page_No = this.filter.Page_No + 1;
      this.props.getQuestionLibrary(this.filter);
    }
  };
  setModal1Visible = modal1Visible => {
    this.setState({ modal1Visible });
  };
  handleMenuClick = e => {
    const {
      match: { params }
    } = this.props;

    const user_details = checkStorage();
    const user_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;
    if (e.key === 'insert') {
      this.props.getTestList(user_Id);
      this.setState({ modal1Visible: true });
    }
    if (e.key === 'add') {
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
          Test_Id: params.id,
          Question_Id: question_id.toString(),
          Question_Category_Id: Question_Category_Id.toString(),
          Created_By: user_Id
        };
        this.props.addQuestionToTest(Data);
      } else {
        this.openNotification('topLeft');
      }
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
    const { questionLibraryState } = this.props;
    const {
      match: { params }
    } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={params.id ? 'add' : 'insert'}>
          {params.id ? 'Add Questions' : 'insert Questions'}
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Row>
          <Col span={5}>
            <Filters questionLibrary={questionLibraryState} />
          </Col>
          <Col span={19}>
            <Row>
              <Col span={8}>
                <Dropdown overlay={menu}>
                  <Button type="primary" style={{ width: '120px' }}>
                    ACTION{' '}
                    <Icon
                      type="down"
                      style={{
                        paddingLeft: '20%',
                        fontSize: '14px'
                      }}
                    />
                  </Button>
                </Dropdown>
              </Col>

              <Col span={16} style={{ marginTop: '.5%', marginBottom: '.5%' }}>
                <Auto questionLibrary={questionLibraryState} />
              </Col>
            </Row>
            <QuestionTable
              questionLibrary={questionLibraryState}
              test_id={params.id ? params.id : null}
              onPageChange={this.onPageChange}
            />
          </Col>
        </Row>
        <TestModal
          modal1Visible={this.state.modal1Visible}
          setModal1Visible={this.setModal1Visible}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getQuestionLibrary: item => {
      dispatch(getQuestionLibraryAction(item));
    },
    getTestList: User_Id => {
      dispatch(getTestListAction(User_Id));
    },
    addQuestionToTest: item => {
      dispatch(addQuestionToTestAction(item));
    }
  };
};
const mapStateToProps = state => {
  const {
    libraryState: { questionLibraryState, selectQuestionsState }
  } = state;
  return {
    questionLibraryState,
    selectQuestionsState
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
