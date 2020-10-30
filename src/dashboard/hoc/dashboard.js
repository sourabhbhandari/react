import React, { Component } from 'react';
import Dashboard from '../dashboard';
import Loading from '../loading/loading';
class DashboardHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Loading>
        <Dashboard />
      </Loading>
    );
  }
}

export default DashboardHOC;
