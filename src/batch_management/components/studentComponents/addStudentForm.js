import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { addStudent } from '../../state/actions/actions';

class addStudentForm extends Component {
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
    debugger;
    const { batchId } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Batch_Id'] = batchId;
        values['Institute_Id'] = '1';
        values['Created_By'] = '63';
        values['Student_Email_Id'] = [values.Email_Id];
        values['Student_Mobile_Number'] = [values.Mobile_Number];
        this.props.addStudent(values);
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
      <div style={{ marginTop: '1%' }}>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="Email Id" hasFeedback>
            {getFieldDecorator('Email_Id', {
              rules: [
                {
                  required: true,
                  message: 'Please enter emailId!'
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
            })(<Input placeholder="please enter student mobile number" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Student
            </Button>
            <Button type="danger" ghost>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {
  return {
    addStudent: request => {
      dispatch(addStudent(request));
    }
  };
};
addStudentForm = Form.create({ name: 'horizontal_login' })(addStudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(addStudentForm);
