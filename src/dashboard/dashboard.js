import React from 'react';
import {Layout, Icon, Button} from 'antd';
import {Redirect} from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import {enquireScreen} from 'enquire-js';
import {connect} from 'react-redux';

import DashboardContent from './dashboard_content';
import SiderDashboard from './dashboardSider';
import {sideMenuClickAction} from './redux-state/actions/sider/siderActions';
import {logoutUserAction} from '../auth/actions/authenticationActions';
import './dashboard.css';
import {checkStorage} from '../auth/utils/cookies';

const {Header, Content} = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMobile, isLoggedin: true, collapsed: isMobile, url: ''};
  }

  toggle = () => {
    const {collapsed} = this.props;
    const request = !collapsed;
    this.props.sideMenuClickAction(request);
  };

  signOutFromGoogle = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '485611124501-i2qh275pt6kht0o00s2kpqkumbbu0rq6.apps.googleusercontent.com',
        })
        .then(() => {
          window.gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(function() {});
        });
    });
    this.props.logoutUserAction();
  };

  render() {
    const {collapsed} = this.props;
    const {
      login: {isLoggedIn},
    } = this.props;
    const user = checkStorage();
    if (!user.isLoggedIn) {
      return <Redirect to="/" />;
    }

    let width = 200;
    let displayUser = 'block';
    if (collapsed) {
      width = 80;
    } else {
      width = 200;
    }

    const contentStyle = {
      padding: '10px',
      marginLeft: `${width}px`,
      background: '#fff',
    };

    return (
      <Layout>
        <SiderDashboard toggle={this.toggle} />
        <Layout style={contentStyle}>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Button
              onClick={this.signOutFromGoogle}
              style={{float: 'right', marginTop: 10}}
              type="danger"
              ghost
            >
              <Icon className="trigger" type="logout" />
              Logout
            </Button>
          </Header>

          <Content style={{overflow: 'initial'}}>
            <DashboardContent
              isMobile={isMobile}
              path={this.state.url ? this.state.url : window.location.pathname}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const {
    dashboardState: {
      sider: {collapsed},
    },
    authState: {login},
  } = state;
  return {
    collapsed,
    login,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    sideMenuClickAction: request => {
      dispatch(sideMenuClickAction(request));
    },
    logoutUserAction: () => {
      dispatch(logoutUserAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
