import React, { Component } from 'react';
import { Form, Button, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import { addInstituteStudent } from '../state/actions/actions';

class AddStudent extends Component {
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    e.preventDefault();
    this.utilFormReset();
  };
  handleSubmit = e => {
    debugger;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Institute_Id'] = '1';
        values['Created_By'] = '63';
        this.props.addInstituteStudent(values);
        this.handleReset();
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
                    message: 'Please enter emailId!'
                  }
                ]
              })(
                <Input type="mail" placeholder="Please enter student emailId" />
              )}
            </Form.Item>
            <Form.Item label="Mobile No" hasFeedback>
              {getFieldDecorator('Mobile_Number', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter mobile number'
                  }
                ]
              })(<Input placeholder="please enter student mobile number" />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Student
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
    addInstituteStudent: request => {
      dispatch(addInstituteStudent(request));
    }
  };
};
AddStudent = Form.create({ name: 'horizontal_login' })(AddStudent);
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);
