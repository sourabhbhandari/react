import React, { Component } from 'react';
import { connect, batch } from 'react-redux';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { Card, Icon, List, Button, Spin, ConfigProvider } from 'antd';
import CreateAssignment from './createAssignment';
import {
  getAssignmentList,
  deleteAssignment,
  getStudentList
} from '../../state/actions/actions';
import SendModal from './sendModal';
import { checkStorage } from '../../../auth/utils/cookies';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class assignmentComponent extends Component {
  state = {
    noTitleKey: 'Create',
    assignmentId: null,
    visible: false
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    const { batchId } = this.props;
    this.setState({ noTitleKey: key });
    if (key === 'List') {
      this.props.getAssignmentList({ Institute_Id: '1', Batch_Id: batchId });
    }
  };
  componentDidMount() {
    // const { batchId } = this.props;
    // this.props.getAssignmentList({ Institute_Id: '1', Batch_Id: batchId });
  }
  handleDelete = assignmentId => {
    const { batchId } = this.props;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      Created_By: user.User_Id,
      Assignment_Id: assignmentId,
      Institute_Id: '1'
    };
    this.props.deleteAssignment(request);
  };
  customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <Icon type="file-search" style={{ fontSize: 40, marginBottom: '2%' }} />
      <p>No Assignment is assigned yet!!</p>
    </div>
  );
  openModal = assignmentId => {
    const { batchId } = this.props;
    let request = {
      Institute_Id: '1',
      Batch_Id: batchId
    };
    this.props.getStudentList(request);
    this.setState({
      visible: true,
      assignmentId: assignmentId
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      batchId,
      uiState: { loading },
      assignmentState
    } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';
    const tabListNoTitle = [
      {
        key: 'Create',
        tab: 'Create'
      },
      {
        key: 'List',
        tab: 'List'
      }
    ];

    const contentListNoTitle = {
      Create: <CreateAssignment batchId={batchId} />,
      List: (
        <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
          <List
            style={isMobile ? { textAlign: 'center' } : { margin: '20px' }}
            itemLayout={layout}
            pagination={{
              onChange: page => {},
              pageSize: 3
            }}
            dataSource={assignmentState}
            renderItem={item => (
              <List.Item
                key={item.Assignment_Id}
                style={{ border: 'solid 1px', margin: '1%' }}
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.openModal(item.Assignment_Id)}
                  >
                    <Icon type="share-alt" />
                  </Button>,
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleDelete(item.Assignment_Id)}
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
                        type="solution"
                        style={{
                          marginRight: '1%',
                          fontSize: '20px'
                        }}
                      />
                      {item.Assignment_Topic}
                    </span>
                  }
                  description={item.Assignment_Description}
                />
                <p style={{ textAlign: 'center', marginRight: '15%' }}>
                  {item.Submission_Date_And_Time}
                </p>
              </List.Item>
            )}
          />
        </ConfigProvider>
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
          <Spin spinning={loading}>
            {contentListNoTitle[this.state.noTitleKey]}
          </Spin>
        </Card>
        <SendModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          batchId={batchId}
          assignmentId={this.state.assignmentId}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { uiState, assignmentState }
  } = state;
  return { uiState, assignmentState };
};
const mapDispatchToProps = dispatch => {
  return {
    getAssignmentList: request => {
      dispatch(getAssignmentList(request));
    },
    deleteAssignment: request => {
      dispatch(deleteAssignment(request));
    },
    getStudentList: request => {
      dispatch(getStudentList(request));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(assignmentComponent);
