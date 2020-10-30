import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

class BatchSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let displayUser = 'block';
    const { collapsed } = this.props;
    if (collapsed) {
      displayUser = 'none';
    } else {
      displayUser = 'block';
    }
    const { id } = this.props;
    const { handleClick } = this.props;
    return (
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        style={{
          left: 0
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['2']}
          onClick={handleClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="2">
            <span>
              <Icon type="book" theme="filled" />
              <span>Subject</span>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>
              <Icon type="usergroup-add" />
              <span>Student</span>
            </span>
          </Menu.Item>
          <Menu.Item key="4">
            <span>
              <Icon type="notification" theme="filled" />

              <span>Announcement</span>
            </span>
          </Menu.Item>
          <Menu.Item key="1">
            <span>
              <Icon type="file-done" />
              <span>Assignments</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  const {
    dashboardState: {
      sider: { collapsed }
    },
    authState: { login }
  } = state;
  return {
    collapsed,
    login
  };
}

export default connect(mapStateToProps)(BatchSlider);
