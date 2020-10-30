import {Modal, Card} from 'antd';
import React from 'react';
import LoginForm from './login';

export default class Login extends React.Component {
  state = {
    visible: false,
  };

  static getDerivedStateFromProps(props) {
    return {
      visible: props.signinVisible,
    };
  }

  render() {
    const {visible} = this.state;
    const {handleSigninCancel} = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          onCancel={handleSigninCancel}
          footer={null}
          width={850}
        >
          <LoginForm />
        </Modal>
      </div>
    );
  }
}
