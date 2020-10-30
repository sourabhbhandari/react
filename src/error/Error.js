import React, {Component} from 'react';
import {Result, Button} from 'antd';

export default class Error extends Component {
  render() {
    return (
      <div>
        <Result
          status="warning"
          title="Please try after some time."
          extra={
            <Button type="primary" key="console">
              Refresh
            </Button>
          }
        />
      </div>
    );
  }
}
