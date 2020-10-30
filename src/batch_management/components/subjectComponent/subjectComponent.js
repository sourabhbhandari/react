import React, { Component } from 'react';
import {
  Card,
  List,
  Icon,
  Spin,
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Avatar,
  ConfigProvider
} from 'antd';
import { enquireScreen } from 'enquire-js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddSubject from './addSubjectForm';
import AddTeacherModal from './addTeacherModal';
import { checkStorage } from '../../../auth/utils/cookies';
import {
  getSubjectList,
  getTeacherList,
  deleteSubject,
  deleteSubjectFaculty
} from '../../state/actions/actions';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class studentComponent extends Component {
  state = {
    noTitleKey: 'Subject_List',
    visible: false,
    subjectId: null
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ noTitleKey: key });
    const {
      batchId,
      batchListState: { active }
    } = this.props;
    let data = active.filter(item => item.Batch_Id === batchId);
    if (key === 'Subject_List') {
      this.props.getSubjectList({
        Institute_Id: '1',
        Batch_Id: batchId,
        SubCategory_Id: data[0].SubCategory_Id
      });
    }
  };
  showModal = e => {
    const { batchId } = this.props;
    let request = {
      Institute_Id: '1',
      Batch_Id: batchId,
      Subject_Id: e
    };
    this.props.getTeacherList(request);

    this.setState({
      visible: true,
      subjectId: e
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
    this.getSubjectList();
  };
  handleOk = () => {
    this.setState({ visible: false });
    this.getSubjectList();
  };
  getSubjectList = () => {
    const {
      batchId,
      batchListState: { active, inactive }
    } = this.props;
    let data =
      active.find(item => item.Batch_Id === batchId) ||
      inactive.find(item => item.Batch_Id === batchId);
    this.props.getSubjectList({
      Institute_Id: '1',
      Batch_Id: batchId,
      SubCategory_Id: data.SubCategory_Id
    });
  };
  componentDidMount() {
    this.getSubjectList();
  }
  handleDelete = subjectId => {
    const { batchId } = this.props;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      User_Id: user.User_Id,
      Subject_Id: subjectId,
      Institute_Id: '1'
    };
    this.props.deleteSubject(request);
  };
  deleteFaculty = (facultyId, subjectId) => {
    const { batchId } = this.props;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      Faculty_Id: facultyId,
      Subject_Id: subjectId,
      User_Id: user.User_Id,
      Institute_Id: '1'
    };
    this.props.deleteTeacher(request);
  };
  createMenu = subjectId => {
    debugger;
    const { subjectState } = this.props;
    let faculty = subjectState.already_added.find(
      item => item.Subject_Id === subjectId
    );

    return (
      <Menu>
        {faculty
          ? faculty.facultyList.map(item => (
              <Menu.Item>
                <Row>
                  <Col span={20}>
                    <Avatar icon="user" style={{ marginRight: '4%' }} />
                    {item.Email_Id}
                  </Col>
                  <Col span={4}>
                    <Button
                      style={{ margin: 'auto' }}
                      type="primary"
                      size="small"
                      shape="circle"
                      onClick={() =>
                        this.deleteFaculty(item.Faculty_Id, subjectId)
                      }
                    >
                      <Icon type="delete" theme="filled" />
                    </Button>
                  </Col>
                </Row>
              </Menu.Item>
            ))
          : null}

        <Menu.Item>
          <Button
            block
            type="primary"
            ghost
            icon="plus"
            style={{ margin: 'auto' }}
            onClick={() => this.showModal(subjectId)}
          >
            Add Faculty
          </Button>
        </Menu.Item>
      </Menu>
    );
  };
  customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <Icon
        type="book"
        theme="twoTone"
        style={{ fontSize: 40, marginBottom: '2%' }}
      />

      <p>No Subject is added yet!!</p>
    </div>
  );
  render() {
    const tabListNoTitle = [
      {
        key: 'Subject_List',
        tab: 'Subject List'
      },
      {
        key: 'Add_Subject',
        tab: 'Add Subject'
      }
    ];
    const {
      subjectState,
      batchId,
      uiState: { loading }
    } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';
    debugger;

    const contentListNoTitle = {
      Subject_List: (
        <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
          <List
            style={isMobile ? { textAlign: 'center' } : {}}
            itemLayout={layout}
            pagination={{
              onChange: page => {},
              pageSize: 4
            }}
            dataSource={subjectState.already_added}
            renderItem={item => (
              <List.Item
                className="subject-item"
                key={item.Subject_Id}
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleDelete(item.Subject_Id)}
                  >
                    <Icon type="delete" theme="filled" />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  style={{ marginLeft: '2%', fontSize: '8px' }}
                  title={
                    <span style={{ textTransform: 'capitalize' }}>
                      <Icon
                        type="book"
                        theme="twoTone"
                        style={{ marginRight: '1%' }}
                      />
                      {item.Subject_Name}
                    </span>
                  }
                  description={
                    <span>
                      <Icon
                        type="clock-circle"
                        theme="twoTone"
                        style={{ marginRight: '1%' }}
                      />
                      {item.Subject_Start_Time} to {item.Subject_End_Time}
                    </span>
                  }
                />
                <p style={{ textAlign: 'center' }}>
                  <Dropdown
                    overlay={() => this.createMenu(item.Subject_Id)}
                    overlayStyle={{ width: '280px' }}
                    placement="bottomRight"
                  >
                    <Link onClick={e => e.preventDefault()}>
                      Faculty List
                      <Icon type="down" />
                    </Link>
                  </Dropdown>
                </p>
              </List.Item>
            )}
          />
        </ConfigProvider>
      ),
      Add_Subject: <AddSubject batchId={batchId} />
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
          <Spin spinning={loading}>
            {contentListNoTitle[this.state.noTitleKey]}
          </Spin>
        </Card>
        <AddTeacherModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          batchId={batchId}
          subjectId={this.state.subjectId}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { batchListState, subjectState, uiState }
  } = state;
  return { batchListState, subjectState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getSubjectList: request => {
      dispatch(getSubjectList(request));
    },
    deleteSubject: request => {
      dispatch(deleteSubject(request));
    },
    deleteTeacher: request => {
      dispatch(deleteSubjectFaculty(request));
    },
    getTeacherList: request => {
      dispatch(getTeacherList(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(studentComponent);
