import React from 'react';
import { Spin } from 'antd';
import './loading.css';

export default class Loading extends React.Component {
  render() {
    return (
      <>
        <div className="spin-list" style={{ paddingTop: '183px' }}>
          <Spin size="large" />
          <p>Loading contents for you</p>
        </div>
      </>
    );
  }
}
