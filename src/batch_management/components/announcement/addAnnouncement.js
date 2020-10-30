import React, { Component } from 'react';
import { Form, Button, Input, Alert } from 'antd';
import { connect } from 'react-redux';
import { createAnnouncement } from '../../state/actions/actions';
import { checkStorage } from '../../../auth/utils/cookies';

class addAnnouncement extends Component {
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    e.preventDefault();
    this.utilFormReset();
  };
  handleSubmit = e => {
    e.preventDefault();
    const { batchId } = this.props;
    const user = checkStorage();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Batch_Id'] = batchId;
        values['Created_By'] = user.User_Id;
        values['Institute_Id'] = '1';
        values['Sms_Flag'] = '0';
        values['File_Url'] = 'null';
        this.props.createAnnouncement(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };

    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 4 }
    };

    return (
      <div>
        <Alert
          style={{ margin: '0 2%' }}
          message="Informational Notes"
          description="Once Announcement is created it will be sent to all students related to this batch"
          type="info"
          showIcon
        />
        <div style={{ marginBottom: '2%' }} />
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="Title" hasFeedback>
            {getFieldDecorator('Announcement_Title', {
              rules: [
                {
                  required: true,
                  message: 'Please Enter Title'
                }
              ]
            })(<Input placeholder="Enter announcement heading" />)}
          </Form.Item>
          <Form.Item label="Description" hasFeedback>
            {getFieldDecorator('Announcement_Description', {
              rules: [
                {
                  required: true,
                  message: 'Please Enter description!'
                }
              ]
            })(<Input placeholder="Enter announcement description" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
            <Button type="danger" ghost onClick={this.handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { uiState }
  } = state;
  return { uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    createAnnouncement: request => {
      dispatch(createAnnouncement(request));
    }
  };
};
addAnnouncement = Form.create({ name: 'horizontal_login' })(addAnnouncement);
export default connect(mapStateToProps, mapDispatchToProps)(addAnnouncement);
