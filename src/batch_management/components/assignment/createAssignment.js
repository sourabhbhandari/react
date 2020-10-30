import React, { Component } from 'react';
import { Form, Button, Input, Tooltip, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { checkStorage } from '../../../auth/utils/cookies';
import { createAssignment } from '../../state/actions/actions';

class addAssignment extends Component {
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
    let user = checkStorage();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Institute_Id'] = '1';
        values['Created_By'] = user.User_Id;
        values['Batch_Id'] = batchId;
        values['File_Url'] = 'null';
        values['Sms_Flag'] = '0';
        values['Submission_Date_And_Time'] = values['date-time-picker'].format(
          'YYYY-MM-DD HH:mm:ss'
        );
        values['Student_Id'] = null;
        this.props.createAssignment(values);
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
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="Assignment Topic" hasFeedback>
            {getFieldDecorator('Assignment_Topic', {
              rules: [
                {
                  required: true,
                  message: 'Please Select Subject!'
                }
              ]
            })(<Input placeholder="Enter assignment heading" />)}
          </Form.Item>
          <Form.Item label="Assignment Description" hasFeedback>
            {getFieldDecorator('Assignment_Description', {
              rules: [
                {
                  required: true,
                  message: 'Please Enter assignment!'
                }
              ]
            })(<Input placeholder="Enter assignment heading" />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Submission date &nbsp;
                <Tooltip title=" Submission On">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('date-time-picker', {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: 'Please select time!'
                }
              ]
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Create Assignment
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
    createAssignment: request => {
      dispatch(createAssignment(request));
    }
  };
};
addAssignment = Form.create({ name: 'horizontal_login' })(addAssignment);
export default connect(mapStateToProps, mapDispatchToProps)(addAssignment);
