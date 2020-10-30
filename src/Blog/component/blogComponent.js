import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { Row, Col, Button, Divider, Avatar, Tag, Icon, BackTop } from 'antd';
import { checkStorage } from '../../auth/utils/cookies';
import CommentComponent from './commentComponent';
import MenuComponent from './menuComponent';
import ClapIcon from './clapIcon';
import { likeBlog } from '../state/actions/actions';
import '../Blog.css';
import Error from '../../components/global/error/page_not_found/page_not_found';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
let user = checkStorage();
export class BlogComponent extends Component {
  state = {
    signinVisible: false,
    loading: false,
    Show: false
  };
  getTimeDetails = Time => {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    var d = new Date(Time);
    let time = `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`;
    return time;
  };
  showComment = () => {
    if (this.state.Show) {
      this.setState({ Show: false });
    } else {
      this.setState({ Show: true });
    }
  };

  likeBlog = e => {
    e.preventDefault();
    debugger;
    const { blogState } = this.props;
    let request = {
      Blog_Id: parseInt(blogState.Blog_Id),
      User_Id: user.User_Id
    };
    this.props.likeBlog(request);
  };
  createTags = tags => {
    return tags.map(tag => <Tag color="blue">{tag}</Tag>);
  };
  render() {
    const { Show } = this.state;
    const { blogState } = this.props;
    return (
      <>
        {blogState ? (
          <div>
            <Divider style={{ marginTop: '-1px', marginBottom: '-1px' }} />
            <div className="nav-container">
              <MenuComponent page="blog" />
            </div>
            <div className="blog-container">
              <h1>{blogState.Blog_Title}</h1>
              <h2>{blogState.Blog_Subtitle}</h2>
              <Row>
                <Col span={6}>
                  <Avatar
                    size={isMobile ? 60 : 80}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </Col>
                <Col span={12}>
                  <h3 className="blogger-name">{blogState.Publisher}</h3>
                  <p
                    style={
                      isMobile
                        ? { marginLeft: '-73%' }
                        : { marginLeft: '-116%' }
                    }
                  >
                    {this.getTimeDetails(blogState.Created_Date)}
                  </p>
                </Col>
                <Col span={6}>
                  <Button ghost type="primary" style={{ marginTop: '15px' }}>
                    Follow
                  </Button>
                </Col>
              </Row>
            </div>

            <img className="blog-img" src={blogState.Image_Url} alt="ji" />

            <Row>
              <Col span={isMobile ? 2 : 6}>
                {isMobile ? null : (
                  <div style={{ margin: '40% 25% auto 25%' }}>
                    <p
                      style={{
                        fontWeight: 600,
                        color: 'rgba(0, 0, 0, 0.84)',
                        lineHeight: '20px'
                      }}
                    >
                      TestEngine
                    </p>
                    <p>Best Platform for online test</p>
                    <Button
                      ghost
                      type="primary"
                      style={{ marginBottom: '10%', marginLeft: '-1%' }}
                    >
                      Follow
                    </Button>
                    <br />
                    <Button
                      shape="circle"
                      ghost
                      size="large"
                      onClick={this.likeBlog}
                      style={{
                        borderStyle: 'none',
                        color: 'rgba(0, 0, 0, 0.45)',
                        marginLeft: '-1%'
                      }}
                    >
                      <ClapIcon />
                    </Button>
                    <span>{blogState.Likes_Count} Claps</span>
                  </div>
                )}
              </Col>
              <BackTop style={{ right: '40px', bottom: '100px' }} />
              <Col span={isMobile ? 20 : 12}>
                <p>{blogState.Blog_Content}</p>
                <Row style={{ marginTop: '5%' }}>
                  <Col span={16}>
                    <Icon
                      type="tags"
                      style={{ fontSize: '30px', marginRight: '2%' }}
                    />
                    {this.createTags(blogState.Tags)}
                  </Col>
                  <Col span={8}>
                    <div
                      style={{
                        marginTop: '5%',
                        marginLeft: '8%'
                      }}
                    >
                      <Button
                        type="primary"
                        shape="circle"
                        ghost
                        size="large"
                        onClick={this.likeBlog}
                        style={{
                          width: '70px',
                          height: '70px',
                          borderColor: 'rgba(0, 0, 0, 0.45)',
                          borderWidth: '1px'
                        }}
                      >
                        <ClapIcon Like={blogState.Like ? true : false} />
                      </Button>
                    </div>
                    <span style={{ marginTop: '8%', marginLeft: '12%' }}>
                      {blogState.Likes_Count} Claps
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col span={isMobile ? 2 : 6}></Col>
            </Row>
            <div className="writer-container">
              <Divider />
              <Row>
                <Col span={isMobile ? 6 : 4}>
                  <Avatar
                    src="https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/13.jpg"
                    className="writter-img"
                  />
                </Col>
                <Col span={isMobile ? 12 : 14}>
                  <p>WRITTEN BY</p>
                  <h3>{blogState.Publisher}</h3>
                  <p>
                    Im a front end developer.Have good experience in frontend
                  </p>
                </Col>
                <Col span={6}>
                  <Button type="primary" ghost>
                    Follow
                  </Button>
                </Col>
              </Row>

              <Divider />
              <Button
                block
                type="primary"
                style={{ margin: 'auto auto 3% auto', height: '60px' }}
                ghost
                onClick={this.showComment}
              >
                {Show ? 'Hide Response' : 'See Response'}
              </Button>
            </div>
            <div className="comment-container">
              {Show ? (
                <CommentComponent
                  Comments={blogState.Comments}
                  blog_Id={blogState.Blog_Id}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <Error />
        )}
      </>
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
    likeBlog: request => {
      dispatch(likeBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogComponent);
