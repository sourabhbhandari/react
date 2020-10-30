import React, { Component } from 'react';
import { Form, Button, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import { addInstituteTeacher } from '../state/actions/actions';

class addTeacher extends Component {
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    e.preventDefault();
    this.utilFormReset();
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Institute_Id'] = '1';
        values['Created_By'] = '63';
        this.props.addInstituteTeacher(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      uiState: { loading }
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };

    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 4 }
    };
    return (
      <div>
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit} {...formItemLayout}>
            <Form.Item label="Email Id" hasFeedback>
              {getFieldDecorator('Email_Id', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter faculty emailId!'
                  }
                ]
              })(<Input type="mail" placeholder="Please enter emailId" />)}
            </Form.Item>
            <Form.Item label="Mobile No" hasFeedback>
              {getFieldDecorator('Mobile_Number', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter mobile number'
                  }
                ]
              })(<Input placeholder="please enter faculty mobile number" />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Teacher
              </Button>
              <Button type="danger" ghost onClick={this.handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Spin>
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
    addInstituteTeacher: request => {
      dispatch(addInstituteTeacher(request));
    }
  };
};
addTeacher = Form.create({ name: 'horizontal_login' })(addTeacher);

export default connect(mapStateToProps, mapDispatchToProps)(addTeacher);
