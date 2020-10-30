import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import {
  HomeFooterDataSource,
  HomeNavDataSource
} from '../landing/Home/data.source';
import { categoryListAction } from './state/actions/Action';
import Loading from '../components/global/loading/loading';
import CategoryList from './categoryList';
import Footer from '../landing/Home/home_footer';
import HomeNav from '../landing/Home/home_nav';
import Login from '../auth/components/login/login_modal';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
const { Search } = Input;
class categoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      signinVisible: false
      // show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  showSignin = () => {
    this.setState({
      signinVisible: true
    });
  };

  handleSigninCancel = () => {
    this.setState({ signinVisible: false });
  };

  showSignin = () => {
    this.setState({
      signinVisible: true
    });
  };

  handleSigninCancel = () => {
    this.setState({ signinVisible: false });
  };
  componentDidMount() {
    this.props.categoryListAction();
  }
  render() {
    const {
      categoryListState,
      uiState: { loading }
    } = this.props;
    return (
      <div style={{ backgroundColor: '#faf6eb', paddingBottom: '40px' }}>
        <HomeNav
          id="HomeNav_0"
          key="HomeNav_0"
          onClick={this.showSignin}
          dataSource={HomeNavDataSource}
          isMobile={this.state.isMobile}
        />

        <div>
          {!loading ? (
            <CategoryList categoryListState={categoryListState} />
          ) : (
            <Loading />
          )}
        </div>

        <Footer
          id="HomeFooter_0"
          key="HomeFooter_0"
          dataSource={HomeFooterDataSource}
          isMobile={isMobile}
        />
        <Login
          onclick={this.showModal}
          isMobile={this.state.isMobile}
          signinVisible={this.state.signinVisible}
          handleSigninCancel={this.handleSigninCancel}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    categoryState: { categoryListState, uiState }
  } = state;
  return { categoryListState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    categoryListAction: () => {
      dispatch(categoryListAction());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);
