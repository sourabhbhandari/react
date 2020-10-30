import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { checkStorage } from '../auth/utils/cookies';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;
const data = checkStorage();
class DashboardSider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = e => {
    const { toggle } = this.props;
    if (e.key === 'item_5') {
      toggle();
    }
  };
  render() {
    let displayUser = 'block';
    const { collapsed } = this.props;
    if (collapsed) {
      displayUser = 'none';
    } else {
      displayUser = 'block';
    }

    return (
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          onClick={this.handleClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <div
            style={{
              textAlign: 'center',
              alignContent: 'center',
              margin: 30,
              display: displayUser
            }}
          >
            <span>
              <Avatar
                style={{ overflow: 'none' }}
                size={64}
                icon="user"
                src={data.isGoogle ? data.imageUrl : ''}
              />
            </span>

            <span style={{ display: 'block', marginTop: 30 }}>
              {data
                ? data.isGoogle
                  ? data.fullName
                  : data.First_Name + ' ' + data.Last_Name
                : ''}
            </span>
          </div>
          <Menu.Item>
            <span>
              <Icon type="home" theme="filled" />
              <span>
                <NavLink
                  to={'/dashboard/'}
                  activeClassName="selected"
                  style={{ color: 'rgba(255,255,255,.65)' }}
                >
                  Home
                </NavLink>
              </span>
            </span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="snippets" theme="filled" />
                <span>Tests</span>
              </span>
            }
          >
            <Menu.Item key="/dashboard/test/create/">
              <NavLink to={'/dashboard/test/create/'}></NavLink>
              <span>Create</span>
            </Menu.Item>
            <br />
            <Menu.Item key="/dashboard/test/list/">
              <NavLink to={'/dashboard/test/list/'}></NavLink>
              <span>List</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="file-unknown" theme="filled" />
                <span>Questions</span>
              </span>
            }
          >
            <Menu.Item>
              <NavLink to={'/dashboard/question/create/'}></NavLink>
              <span>Create</span>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={'/dashboard/question/list/'}></NavLink>
              <span>List All</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="form" the />
                <span>Blog</span>
              </span>
            }
          >
            <Menu.Item key="/dashboard/blog/create/">
              <NavLink to={'/dashboard/blog/create/'}></NavLink>
              <span>Create Blog</span>
            </Menu.Item>
            <Menu.Item key="/dashboard/blog/list/">
              <NavLink to={'/dashboard/blog/list/'}></NavLink>
              <span>List </span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="apartment" />
                <span>Batch</span>
              </span>
            }
          >
            <Menu.Item key="/dashboard/batch/create/">
              <NavLink to={'/dashboard/batch/create/'}></NavLink>
              <span>Create Batch</span>
            </Menu.Item>
            <Menu.Item key="/dashboard/batch/list/">
              <NavLink to={'/dashboard/batch/list/'}></NavLink>
              <span>Batch List </span>
            </Menu.Item>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <span>Teacher</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/batch/teacher/add">
                <NavLink to={'/dashboard/batch/teacher/add'}></NavLink>
                <span>Add Teacher</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/batch/teacher/list">
                <NavLink to={'/dashboard/batch/teacher/list'}></NavLink>
                <span>Teacher List </span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <span>Student</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/batch/student/add">
                <NavLink to={'/dashboard/batch/student/add'}></NavLink>
                <span>Add Student</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/batch/student/list">
                <NavLink to={'/dashboard/batch/student/list'}></NavLink>
                <span>Student List </span>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="pie-chart" theme="filled" />
                <span>Analytics</span>
              </span>
            }
          >
            <Menu.Item>
              <NavLink to={'/dashboard/analytics/create/'}></NavLink>
              <span>Create</span>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={'/dashboard/analytics/list/'}></NavLink>
              <span>List</span>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={'/dashboard/analytics/result/'}></NavLink>
              <span>Result</span>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={'/dashboard/analytics/compare/'}></NavLink>
              <span>Compare</span>
            </Menu.Item>
          </SubMenu>

          <Menu.Item>
            <span>
              <Icon type="read" theme="filled" />

              <span>
                <NavLink
                  to={'/dashboard/questionlibrary/'}
                  activeClassName="selected"
                  style={{ color: 'rgba(255,255,255,.65)' }}
                >
                  Question Library
                </NavLink>
              </span>
            </span>
          </Menu.Item>

          <Menu.Item>
            <span>
              <Icon type="setting" theme="filled" />
              <span>
                <NavLink
                  to={'/dashboard/setting/'}
                  activeClassName="selected"
                  style={{ color: 'rgba(255,255,255,.65)' }}
                >
                  Setting
                </NavLink>
              </span>
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

export default connect(mapStateToProps)(DashboardSider);
