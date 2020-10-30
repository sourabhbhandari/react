import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, List, Avatar, Spin, Card } from 'antd';
import { checkStorage } from '../../../auth/utils/cookies';
import { addSubject } from '../../state/actions/actions';
const { Meta } = Card;
class addTeacherModal extends Component {
  addTeacher = facultyId => {
    const { subjectState, subjectId } = this.props;
    let user = checkStorage();
    let subject = subjectState.already_added.find(
      item => item.Subject_Id === subjectId
    );
    let request = {
      Created_By: user.User_Id,
      Subject_Id: subjectId,
      Category_Id: subject.Category_Id,
      SubCategory_Id: subject.SubCategory_Id,
      Institute_Id: '1',
      Faculty_Id: facultyId,
      Batch_Id: subject.Batch_Id
    };
    this.props.addSubject(request);
  };
  render() {
    const {
      visible,
      handleCancel,
      handleOk,
      teacherState,
      uiState: { loading }
    } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          onOk={handleOk}
          width={1000}
          onCancel={handleCancel}
        >
          <Spin spinning={loading}>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 3
              }}
              pagination={{
                onChange: page => {},
                pageSize: 10
              }}
              dataSource={teacherState.remaining}
              renderItem={item => (
                <List.Item style={{ margin: '10% 5% 5% 0' }}>
                  <Card>
                    <Avatar
                      icon="user"
                      style={{ margin: 'auto auto 10% 23%' }}
                      size={100}
                    />
                    <Meta
                      style={{ textAlign: 'center' }}
                      title={item.Email_Id}
                      description={item.Faculty_Description}
                    />
                    <Button
                      block
                      ghost
                      type="primary"
                      icon="plus"
                      onClick={() => this.addTeacher(item.Faculty_Id)}
                    />
                  </Card>
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
    batchState: { uiState, teacherState, subjectState }
  } = state;
  return { teacherState, subjectState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    addSubject: request => {
      dispatch(addSubject(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addTeacherModal);
