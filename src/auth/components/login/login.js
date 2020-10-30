import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography
} from 'antd';
import { connect } from 'react-redux';
import back from '../../../images/back.jpg';
import submit from '../../../images/submit.svg';
import { Redirect } from 'react-router-dom';
import { checkStorage } from '../../utils/cookies';
import GoogleOAuth from '../../../script/scriptGoogleOAuth';

import {
  registerUserAction,
  loginUserAction
} from '../../actions/authenticationActions';

import './login.css';

const { Title, Paragraph } = Typography;
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRegisterForm: false, isLoggedIn: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { isRegisterForm } = this.state;
        if (isRegisterForm) {
          const request = {
            First_Name: values.Full_Name,
            Last_Name: '',
            Email_Id: values.username,
            Password: values.password
          };
          this.props.registerUserAction(request);
        } else {
          const request = {
            Email_Id: values.username,
            Password: values.password
          };
          this.props.loginUserAction(request);
        }
      }
    });
    // this.props.form.resetFields()
  };

  showRegister = e => {
    this.setState({ isRegisterForm: !this.state.isRegisterForm });
  };

  render() {
    let isSuccess;
    const data = checkStorage();
    const { isRegisterForm } = this.state;
    const {
      login: { isLoggedIn }
    } = this.props;

    if (isLoggedIn) {
      debugger;
      if (window.location.pathname.slice(0, 6) == '/blog/') {
        return <Redirect to={window.location.pathname} />;
      }
      return <Redirect to="/dashboard" />;
    }
    // if (this.props.response.login.hasOwnProperty('response')) {
    //   isSuccess = this.props.response.login.response.success;
    //   message = this.props.response.login.response.message;

    //   if (isSuccess) {
    //     setCookie('token', this.props.response.login.response.token, 1);
    //   }
    // }

    // eslint-disable-next-line no-unreachable
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Row>
          <Col
            span={11}
            style={{
              backgroundImage: 'url(' + back + ')',
              marginLeft: '-3%',
              marginTop: '-3%',
              marginBottom: '-10%',
              height: isRegisterForm ? '77vh' : '68vh',
              marginRight: '2%'
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '900',
                marginTop: '30%',
                color: '#fff'
              }}
            >
              Welcome !!
            </h1>
            <h2
              style={{ textAlign: 'center', marginTop: '20%', color: '#fff' }}
            >
              Please connect with us for better experience !!
            </h2>
            <img
              src={submit}
              alt="none"
              style={{
                width: '150px',
                marginLeft: '55%',
                marginTop: isRegisterForm ? '35%' : '20%'
              }}
            />
          </Col>
          <Col span={13}>
            <GoogleOAuth />

            <Form onSubmit={this.handleSubmit} className="login-form">
              {isRegisterForm ? (
                <>
                  <Form.Item>
                    {getFieldDecorator('Full_Name', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your full name!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Enter your Full name"
                      />
                    )}
                  </Form.Item>
                </>
              ) : null}
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input your email!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Enter email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Enter password"
                  />
                )}
              </Form.Item>
              {!isRegisterForm ? (
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                </Form.Item>
              ) : null}
              {isRegisterForm ? (
                <Form.Item>
                  {getFieldDecorator('Phone_Number', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your phone number!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Enter your phone number"
                    />
                  )}
                </Form.Item>
              ) : null}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {isRegisterForm ? 'Register' : 'Log in'}
              </Button>

              <div style={{ marginTop: 10 }}>
                <span style={{ marginLeft: '50%', fontSize: '18px' }}>or</span>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={this.showRegister}
                >
                  {!isRegisterForm ? ' Register' : ' log in'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUserAction: request => {
      dispatch(loginUserAction(request));
    },
    registerUserAction: request => {
      dispatch(registerUserAction(request));
    }
  };
};
const mapStateToProps = state => {
  const {
    authState: { login }
  } = state;
  return {
    login
  };
};
LoginForm = Form.create({ name: 'horizontal_login' })(LoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
