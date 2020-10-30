import React, { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { enquireScreen } from 'enquire-js';
import './style.css';
import { userRegisterAction, getTestLink } from './state/action/Action';
import { connect } from 'react-redux';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class First extends Component {
  state = {
    disabled: true,
    loading: false
  };
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    this.utilFormReset();
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    debugger;
    this.props.getTestLink(params.testLink);
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      userRegisterState: { testId }
    } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);
        values['Test_Id'] = testId;
        this.props.userRegister(values);
        this.setState({ loading: true });
        this.handleReset();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      userRegisterState: { userRegister, testId },
      loading
    } = this.props;
    const {
      match: { params }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    if (userRegister === 'Test Started Successfully...') {
      this.props.history.push(`/first/second/${testId}`);
    }

    return (
      <div id="hello">
        <Spin spinning={loading}>
          <div
            style={{
              textAlign: 'center',
              fontSize: '18x',
              marginTop: '24px',
              marginBottom: '24px'
            }}
          >
            <h1>Welcome to world best Test Portal!!!!!</h1>
            <div style={{ marginTop: '50px' }} />
            <h2>Company name</h2>
          </div>
          <div style={{ marginTop: '50px' }} />
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            style={
              isMobile
                ? { width: '300px', marginLeft: 'auto', marginRight: 'auto' }
                : { width: '600px', marginLeft: 'auto', marginRight: 'auto' }
            }
          >
            <Form.Item label="Full Name">
              {getFieldDecorator('Full_Name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Mobile number">
              {getFieldDecorator('Mobile_Number', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Phone number!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <div style={{ marginTop: '50px' }} />

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon="right-circle"
                style={isMobile ? { marginLeft: '50%' } : {}}
              >
                NEXT
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
    userTestState: {
      userRegisterState,
      uiState: { loading }
    }
  } = state;
  return { userRegisterState, loading };
};
const mapDispatchToProps = dispatch => {
  return {
    userRegister: request => {
      dispatch(userRegisterAction(request));
    },
    getTestLink: request => {
      dispatch(getTestLink(request));
    }
  };
};
First = Form.create({ name: 'horizontal_Register' })(First);
export default connect(mapStateToProps, mapDispatchToProps)(First);
