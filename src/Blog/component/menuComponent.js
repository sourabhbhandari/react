import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { checkStorage } from '../../auth/utils/cookies';
import { getCategoryBlog } from '../state/actions/actions';
import LoginModal from '../../auth/components/login/login_modal';

const { SubMenu } = Menu;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class menuComponent extends Component {
  state = {
    current: 'Home',
    signinVisible: false
  };
  handleClick = e => {
    debugger;

    const data = checkStorage();
    console.log('click ', e);
    if (e.key === 'create') {
      if (!data.User_Id === '') {
        return <Redirect to="/dashboard/blog/create" />;
      } else {
        this.setState({ signinVisible: true });
      }
    }
    if (e.keyPath[1] === 'item_2') {
      this.props.getCategoryBlog(e.key);
    }
    this.setState({
      current: e.key
    });
  };
  showSignin = () => {
    this.setState({
      signinVisible: true
    });
  };

  handleSigninCancel = () => {
    this.setState({ signinVisible: false });
  };
  render() {
    const categoryListState = {
      data: [
        { Category_Id: '10', Category_Name: 'Programming' },
        { Category_Id: '11', Category_Name: 'JEE Advance' },
        { Category_Id: '12', Category_Name: 'JEE Mains' },
        { Category_Id: '13', Category_Name: 'NEET UG' }
      ]
    };
    const { page } = this.props;
    return (
      <div className="nav-container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to={page === 'home' ? '/' : '/blog/home'}>Home</Link>
          </Menu.Item>
          <Menu.Item key="create">Create</Menu.Item>
          <SubMenu title={<span>Category</span>}>
            <Menu.ItemGroup>
              {categoryListState.data.map(item => (
                <Menu.Item key={item.Category_Id}>
                  {item.Category_Name}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="aboutus">About us</Menu.Item>
        </Menu>
        <LoginModal
          isMobile={isMobile}
          signinVisible={this.state.signinVisible}
          handleSigninCancel={this.handleSigninCancel}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    categoryState: { categoryListState }
  } = state;
  return { categoryListState };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategoryBlog: request => {
      dispatch(getCategoryBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(menuComponent);
