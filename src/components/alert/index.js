import React, { Component } from 'react';
import { Alert } from 'antd';

class CustomeAlert extends Component {
  state = {};
  render() {
    const { message, type, afterClose } = this.props;
    return (
      <Alert message={message} type={type} closable afterClose={afterClose} />
    );
  }
}

export default CustomeAlert;
