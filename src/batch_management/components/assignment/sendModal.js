import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Avatar, Checkbox, Spin } from 'antd';
import { updateAssignment } from '../../state/actions/actions';
import { checkStorage } from '../../../auth/utils/cookies';

class sendModal extends Component {
  state = {
    Student_Id: []
  };

  selectStudent = e => {
    debugger;
    if (e.target.checked) {
      this.setState({
        Student_Id: [...this.state.Student_Id, e.target.value]
      });
    } else {
      this.setState({
        Student_Id: [
          ...this.state.Student_Id.filter(item => item !== e.target.value)
        ]
      });
    }
  };
  handleSend = () => {
    const { assignmentId, assignmentState, batchId } = this.props;
    let Assignment = assignmentState.find(
      item => item.Assignment_Id === assignmentId
    );
    let user = checkStorage();
    let request = {
      Institute_Id: '1',
      Assignment_Id: assignmentId,
      Modified_By: user.User_Id,
      Batch_Id: batchId,
      File_Url: 'null',
      Sms_Flag: '0',
      Submission_Date_And_Time: Assignment.Submission_Date_And_Time,
      Student_Id: this.state.Student_Id,
      Assignment_Topic: Assignment.Assignment_Topic,
      Assignment_Description: Assignment.Assignment_Description
    };
    this.props.updateAssignment(request);
  };
  render() {
    const {
      visible,
      handleCancel,
      studentState,
      uiState: { loading }
    } = this.props;
    return (
      <div>
        <Modal
          okText="Send"
          visible={visible}
          onOk={this.handleSend}
          width={1000}
          onCancel={handleCancel}
        >
          <h3 style={{ textAlign: 'center' }}>Student List</h3>
          <Spin spinning={loading}>
            <List
              style={{ marginTop: '6%' }}
              pagination={{
                onChange: page => {},
                pageSize: 4
              }}
              dataSource={studentState.already_added}
              renderItem={item => (
                <List.Item
                  key={item.Student_Id}
                  style={{ border: 'solid 1px', margin: '1%' }}
                  actions={[
                    <Checkbox
                      key={item.Student_Id}
                      defaultChecked={
                        this.state.Student_Id.find(id => id === item.Student_Id)
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
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { assignmentState, uiState, studentState }
  } = state;
  return { uiState, assignmentState, studentState };
};
const mapDispatchToProps = dispatch => {
  return {
    updateAssignment: request => {
      dispatch(updateAssignment(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(sendModal);
