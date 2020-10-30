import React, { Component } from 'react';
import { Menu, Row, Col, Button, Select, Input } from 'antd';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { categoryListAction } from '../../category_home_page/state/actions/Action';
import { getCategoryBlog } from '../state/actions/actions';
import LoginModal from '../../auth/components/login/login_modal';
import MenuComponent from './menuComponent';

const { Search } = Input;
const { Option } = Select;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class Header extends Component {
  state = {
    current: 'home',
    signinVisible: false
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
    this.props.categoryList();
  }
  getBlogs = categoryId => {
    debugger;
    this.props.getCategoryBlog(categoryId);
  };
  popularCategory = data => {
    return data.map(item => (
      <li class="list-inline-item" key={item.Category_Id}>
        <a onClick={() => this.getBlogs(item.Category_Id)}>
          {item.Category_Name}
        </a>
      </li>
    ));
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
    return (
      <div>
        <Row style={{ marginTop: '1%' }}>
          <Col span={6}>
            <h1 className="logo-T">T</h1>
          </Col>
          <Col span={12}>
            <MenuComponent page="home" />
          </Col>
          <Col span={6}>
            {!isMobile ? (
              <>
                <Button
                  type="primary"
                  ghost
                  style={{ margin: '0 15px 0 100px' }}
                  onClick={this.showSignin}
                >
                  Sign in
                </Button>
                <Button size="large">Get started</Button>
              </>
            ) : (
              <Button type="link" onClick={this.showSignin}>
                Sign in
              </Button>
            )}
          </Col>
        </Row>

        <section class="hero-area bg-1  ">
          <div class="container">
            <div class="content-block">
              <h1>Read & Create Article's </h1>
              <p>
                Join the millions who create and read Article's <br /> everyday
                in local communities around the world
              </p>
              <div class="short-popular-category-list ">
                <h2>Popular Category</h2>
                <ul class="list-inline">
                  {this.popularCategory(categoryListState.data)}
                </ul>
              </div>
            </div>
            <Row>
              <Col span={isMobile ? 18 : 20}>
                <Search
                  placeholder="input search text"
                  style={{ marginBottom: '7%' }}
                  size={isMobile ? 'small' : 'large'}
                  onSearch={value => console.log(value)}
                />
              </Col>
              <Col span={isMobile ? 6 : 4}>
                <Select
                  defaultValue="test"
                  size={isMobile ? 'small' : 'large'}
                  style={{ width: isMobile ? '' : 120 }}
                  //onChange={handleChange}
                >
                  <Option value="test">By Text</Option>
                  <Option value="category">By Category</Option>
                  <Option value="author">BY Author</Option>
                  <Option value="latest">Latest</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </section>
        <LoginModal
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
    categoryState: { categoryListState }
  } = state;
  return { categoryListState };
};
const mapDispatchToProps = dispatch => {
  return {
    categoryList: () => {
      dispatch(categoryListAction());
    },
    getCategoryBlog: request => {
      dispatch(getCategoryBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
