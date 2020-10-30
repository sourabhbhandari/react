/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import {enquireScreen} from 'enquire-js';

import HomeNav from './home_nav';
import HomeFooter from './home_footer';
import Login from '../../auth/components/login/login_modal';
// import ContactUs from './contact-us';
import HomeContent from './home-util/content';
import {HomeNavDataSource, HomeFooterDataSource} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const {location} = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      signinVisible: false,
      // show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  showSignin = () => {
    this.setState({
      signinVisible: true,
    });
  };

  handleSigninCancel = () => {
    this.setState({signinVisible: false});
  };

  showSignin = () => {
    this.setState({
      signinVisible: true,
    });
  };

  handleSigninCancel = () => {
    this.setState({signinVisible: false});
  };

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen(b => {
      this.setState({isMobile: !!b});
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const children = [
      <HomeNav
        id="HomeNav_0"
        key="HomeNav_0"
        onClick={this.showSignin}
        dataSource={HomeNavDataSource}
        isMobile={this.state.isMobile}
      />,

      <HomeContent isMobile={this.state.isMobile} />,
      <HomeFooter
        id="HomeFooter_0"
        key="HomeFooter_0"
        dataSource={HomeFooterDataSource}
        isMobile={this.state.isMobile}
      />,
      <Login
        onclick={this.showModal}
        isMobile={this.state.isMobile}
        signinVisible={this.state.signinVisible}
        handleSigninCancel={this.handleSigninCancel}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={d => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
