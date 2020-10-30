import React, {Component} from 'react';
import {Form, Input, Card, Button, Icon, notification} from 'antd';
import {categorySubscriptionAction} from '../../state/actions/Action';
import {connect} from 'react-redux';

class Body1 extends Component {
  state = {
    status: false,
  };
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      match: {params},
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // todo: remove hard coded param
        values['Category_Id'] = '10';
        this.props.dispatch(categorySubscriptionAction(values));
      }
    });
  };
  successMessage = () => {
    notification.open({
      message: 'subscribed successfully',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <Icon type="smile" style={{color: '#108ee9'}} />,
    });

    this.utilFormReset();
  };
  render() {
    const {categorySubscriptionState} = this.props;
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Card
          style={{
            width: '500px',
            height: '400px',
            borderRadius: '20px',
            boxShadow: '10px 20px 50px rgba(0,0,0,0.3)',
            marginLeft: '130px',
          }}
        >
          <div style={{marginTop: '12%'}} />
          <Form
            onSubmit={this.handleSubmit}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <Form.Item>
              {getFieldDecorator('Full_Name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Fullname!',
                    whitespace: true,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: '#000'}} />}
                  placeholder="Name"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('Email_Id', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="mail" theme="filled" style={{color: '#000'}} />
                  }
                  placeholder="Email-Id"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('Phone_No', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your Phone Number!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="phone" theme="filled" style={{color: '#000'}} />
                  }
                  placeholder="Phone Number"
                />
              )}
            </Form.Item>

            <div style={{marginTop: '50px'}} />

            <Form.Item>
              <Button
                type="primary"
                style={{width: '300px', height: '50px', borderRadius: '20px'}}
                htmlType="submit"
                icon="right-circle"
              >
                SUBSCRIBE
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {categorySubscriptionState.status ? this.successMessage() : ''}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    categoryState: {categorySubscriptionState},
  } = state;
  return {categorySubscriptionState};
};
Body1 = Form.create({name: 'horizontal_Register'})(Body1);
export default connect(mapStateToProps)(Body1);
