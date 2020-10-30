import React, { Component } from 'react';
import {
  Card,
  List,
  Icon,
  Spin,
  Button,
  Avatar,
  Dropdown,
  Menu,
  Checkbox,
  ConfigProvider,
  Row,
  Col,
  Pagination,
  Input
} from 'antd';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { checkStorage } from '../../../auth/utils/cookies';
import AddStudent from './addStudentForm';
import {
  getStudentList,
  deleteStudent,
  addStudent
} from '../../state/actions/actions';

const { Search } = Input;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class studentComponent extends Component {
  state = {
    noTitleKey: 'Student_List',
    Student_Email_Id: [],
    Student_Mobile_Number: [],
    remaining: [],
    already_added: [],
    value1: '',
    value2: ''
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ noTitleKey: key });
    if (key === 'Student_List') {
      const { batchId } = this.props;
      this.props.getStudentList({ Institute_Id: '1', Batch_Id: batchId });
    }
  };
  componentDidMount() {
    debugger;
    const { batchId } = this.props;
    this.props.getStudentList({ Institute_Id: '1', Batch_Id: batchId });
  }
  handleDelete = studentId => {
    const { batchId } = this.props;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      Institute_Id: '1',
      User_Id: user.User_Id.toString(),
      Student_Id: studentId
    };
    this.props.deleteStudent(request);
    this.setState({ already_added: [], value1: [] });
  };
  // handleClick = e => {
  //   debugger;
  //   this.setState({
  //     noTitleKey: e.key
  //   });
  // };
  selectStudent = e => {
    debugger;
    const { studentState } = this.props;
    let student = studentState.remaining.find(
      item => item.Student_Id === e.target.value
    );
    if (e.target.checked) {
      this.setState({
        Student_Email_Id: [...this.state.Student_Email_Id, student.Email_Id],
        Student_Mobile_Number: [
          ...this.state.Student_Mobile_Number,
          student.Mobile_Number
        ]
      });
    } else {
      this.setState({
        Student_Email_Id: this.state.Student_Email_Id.filter(
          item => item !== student.Email_Id
        ),
        Student_Mobile_Number: this.state.Student_Mobile_Number.filter(
          item => item !== student.Email_Id
        )
      });
    }
  };
  addStudent = () => {
    const { batchId } = this.props;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      Created_By: user.User_Id,
      Institute_Id: '1',
      Student_Email_Id: this.state.Student_Email_Id,
      Student_Mobile_Number: this.state.Student_Mobile_Number
    };
    this.props.addStudent(request);
  };
  customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <Icon type="user-add" style={{ fontSize: 40, marginBottom: '2%' }} />

      <p>Please Add Students in batch!!</p>
    </div>
  );
  searchStudent = e => {
    const {
      studentState: { already_added, remaining }
    } = this.props;
    if (e.target.name === 'already_added') {
      this.setState({
        value1: e.target.value,
        already_added: [
          ...already_added.filter(item =>
            item.Email_Id.includes(e.target.value)
          )
        ]
      });
    }
    if (e.target.name === 'remaining') {
      this.setState({
        value2: e.target.value,
        remaining: [
          ...remaining.filter(item => item.Email_Id.includes(e.target.value))
        ]
      });
    }
  };

  render() {
    // const menu = (
    //   <Menu onClick={this.handleClick} selectedKeys={[this.state.noTitleKey]}>
    //     <Menu.Item key="manually">Manually</Menu.Item>
    //     <Menu.Item key="Select_List">Select from list</Menu.Item>
    //   </Menu>
    // );
    const tabListNoTitle = [
      {
        key: 'Student_List',
        tab: 'Student List'
      },
      {
        key: 'manually',
        tab: 'Add Manually'
      },
      {
        key: 'Select_List',
        tab: 'Add From List'
      }
    ];
    const {
      studentState,
      batchId,
      uiState: { loading }
    } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';
    const contentListNoTitle = {
      Student_List: (
        <div>
          <Row style={{ marginBottom: '2%' }}>
            <Col span={12}>
              <Search
                name="already_added"
                value={this.state.value1}
                placeholder="input search text"
                onChange={this.searchStudent}
              />
            </Col>
            <Col span={12}>
              <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                defaultCurrent={1}
                total={
                  this.state.already_added.length !== 0
                    ? this.state.already_added.length
                    : studentState.already_added.length
                }
                style={{ float: 'right' }}
              />
            </Col>
          </Row>
          <div className="demo-infinite-container">
            <Spin spinning={loading}>
              <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
                <List
                  style={
                    isMobile ? { textAlign: 'center' } : { margin: '10px' }
                  }
                  itemLayout={layout}
                  // pagination={{
                  //   onChange: page => {},
                  //   pageSize: 10
                  // }}
                  dataSource={
                    this.state.already_added.length !== 0
                      ? this.state.already_added
                      : studentState.already_added
                  }
                  renderItem={item => (
                    <List.Item
                      style={{ padding: '5px' }}
                      key={item.Student_Id}
                      actions={[
                        <Button
                          type="primary"
                          size="small"
                          shape="circle"
                          onClick={() => this.handleDelete(item.Student_Id)}
                        >
                          <Icon type="delete" theme="filled" />
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        style={{ marginLeft: '2%', fontSize: '8px' }}
                        avatar={<Avatar icon="user" />}
                        title={
                          <span style={{ textTransform: 'capitalize' }}>
                            {item.Email_Id}
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                />
              </ConfigProvider>
            </Spin>
          </div>
        </div>
      ),
      manually: <AddStudent batchId={batchId} />,
      Select_List: (
        <>
          <Row style={{ marginBottom: '2%' }}>
            <Col span={8}>
              <Search
                value={this.state.value2}
                placeholder="input search text"
                name="remaining"
                onChange={this.searchStudent}
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={this.addStudent}
                style={{ margin: 'auto', float: 'right' }}
              >
                Add Students
              </Button>
            </Col>
            <Col span={12}>
              <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                defaultCurrent={1}
                total={
                  this.state.remaining.length !== 0
                    ? this.state.remaining.length
                    : studentState.remaining.length
                }
                style={{ float: 'right' }}
              />
            </Col>
          </Row>
          <div className="demo-infinite-container">
            <Spin spinning={loading}>
              <List
                style={isMobile ? { textAlign: 'center' } : { margin: '10px' }}
                itemLayout={layout}
                // pagination={{
                //   onChange: page => {},
                //   pageSize: 3
                // }}
                dataSource={
                  this.state.remaining.length !== 0
                    ? this.state.remaining
                    : studentState.remaining
                }
                renderItem={item => (
                  <List.Item
                    key={item.Student_Id}
                    actions={[
                      <Checkbox
                        key={item.Student_Id}
                        defaultChecked={
                          this.state.Student_Email_Id.find(
                            emailId => emailId === item.Email_Id
                          )
                            ? true
                            : false
                        }
                        value={item.Student_Id}
                        onChange={this.selectStudent}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      style={{ marginLeft: '2%', fontSize: '8px' }}
                      avatar={<Avatar icon="user" />}
                      title={
                        <span style={{ textTransform: 'capitalize' }}>
                          {item.Email_Id}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </div>
        </>
      )
    };

    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { studentState, uiState }
  } = state;
  return { studentState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getStudentList: request => {
      dispatch(getStudentList(request));
    },
    deleteStudent: request => {
      dispatch(deleteStudent(request));
    },
    addStudent: request => {
      dispatch(addStudent(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(studentComponent);
