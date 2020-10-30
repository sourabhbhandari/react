import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { Row, Col, Button, Avatar } from 'antd';
import Footer from '../../landing/Home/home_footer';
import { HomeFooterDataSource } from '../../landing/Home/data.source';
import LoginModal from '../../auth/components/login/login_modal';
import { getBlog, getRecommendedBlog } from '../state/actions/actions';
import '../Blog.css';
import RecommendedPost from '../component/RecommendedPost';
import BlogComponent from '../component/blogComponent';
import BlogCards from '../component/BlogCards';
import Loading from '../../components/global/loading/loading';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Blog extends Component {
  state = {
    signinVisible: false,
    loading: false
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
    const { blogState } = this.props;
    const {
      match: { params }
    } = this.props;
    this.props.getBlog(params.id);
  }
  render() {
    const { blogState, isLoggedIn, uiState } = this.props;

    return (
      <div>
        <Row>
          <Col span={6}>
            <h1 className="logo-T">T</h1>
          </Col>
          <Col span={13}></Col>
          <Col span={5}>
            {!isLoggedIn ? (
              <>
                <Button type="link" onClick={this.showSignin}>
                  Sign in
                </Button>
                {isMobile ? null : <Button size="large"> Get Started</Button>}
              </>
            ) : (
              <Avatar
                size={isMobile ? 40 : 60}
                src={blogState.imageUrl}
                className="logo-T"
              />
            )}
          </Col>
        </Row>

        {!uiState.loading ? (
          <BlogComponent blogState={blogState} />
        ) : (
          <Loading />
        )}
        {blogState ? (
          <RecommendedPost categoryId={blogState.Category_Id} />
        ) : null}
        <Footer
          id="HomeFooter_0"
          key="HomeFooter_0"
          dataSource={HomeFooterDataSource}
          isMobile={isMobile}
        />
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
    authState: {
      login: { isLoggedIn }
    },
    blogsState: { blogState, uiState }
  } = state;
  return {
    isLoggedIn,
    blogState,
    uiState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBlog: request => {
      dispatch(getBlog(request));
    },
    getRecommendedBlog: request => {
      dispatch(getRecommendedBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
