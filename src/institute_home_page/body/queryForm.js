import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {querySubmitAction} from '../state/actions/Actions';
const {TextArea} = Input;

class queryForm extends Component {
  handleSubmit = e => {
    const {handleCancel} = this.props;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const queryData = {
          Institute_Id: '1',
          User_Full_Name: values.FullName,
          Email_Id: values.email,
          Mobile_No: values.phoneno,
          Query_Text: values.query,
        };
        this.props.dispatch(querySubmitAction(queryData));
        handleCancel();
      }
    });
  };
  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('FullName', {
              rules: [{required: true, message: 'Please enter your name!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="FullName"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please enter your Email id!'}],
            })(
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Email Id"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phoneno', {
              rules: [{required: true, message: 'Please enter your Email id!'}],
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Phone Number"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('query', {
              rules: [{required: true, message: 'Please enter your Email id!'}],
            })(<TextArea rows={4} placeholder="Enter your Query" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
queryForm = Form.create({name: 'vertical_Register'})(queryForm);
export default connect()(queryForm);
