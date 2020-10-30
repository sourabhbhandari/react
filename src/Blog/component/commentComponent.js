import React, { Component } from 'react';
import {
  Comment,
  Tooltip,
  List,
  Avatar,
  Icon,
  Form,
  Button,
  Input
} from 'antd';
import { connect } from 'react-redux';
import { checkStorage } from '../../auth/utils/cookies';
import { commentBlog } from '../state/actions/actions';

const { TextArea } = Input;
class commentComponent extends Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
    comments: [],
    submitting: false,
    value: ''
  };

  like = commentId => {
    const { blog_Id } = this.props;
    let user = checkStorage();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      Comment_Id: commentId,
      Blog_Id: blog_Id,
      User_Id: user.User_Id
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      'https://eaf3f757.ngrok.io/TestingEngine/api/likeBlogComment',
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked'
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked'
    });
  };
  handleSubmit = () => {
    const { blog_Id } = this.props;
    debugger;
    let user = checkStorage();
    if (!this.state.value) {
      return;
    }
    const request = {
      Blog_Id: blog_Id,
      User_Id: user.User_Id,
      Comment_Description: this.state.value
    };
    this.props.commentBlog(request);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { Comments } = this.props;
    const { likes, action } = this.state;
    const { comments, submitting, value } = this.state;
    debugger;
    const actions = [];

    return (
      <div>
        <Form.Item>
          <TextArea
            rows={2}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={this.handleSubmit}
            type="primary"
            ghost
            shape="circular"
          >
            Add Comment
          </Button>
        </Form.Item>

        {Comments ? (
          <List
            className="comment-list"
            header={`${Comments.length} replies`}
            itemLayout="horizontal"
            dataSource={Comments}
            renderItem={item => (
              <li key={Comments.Comment_Id}>
                <Comment
                  actions={[
                    <span key="comment-basic-like">
                      <Tooltip title="Like">
                        <Icon
                          type="like"
                          theme={action === 'liked' ? 'filled' : 'outlined'}
                          onClick={() => this.like(item.Comment_Id)}
                        />
                      </Tooltip>
                      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {likes}
                      </span>
                    </span>
                  ]}
                  author={<a>{item.Commented_By}</a>}
                  avatar={
                    <Avatar
                      src="https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/28.jpg"
                      alt="Han Solo"
                    />
                  }
                  content={<p>{item.Comment_Description}</p>}
                  datetime={
                    <Tooltip title={item.Comment_Created_Date}>
                      <span>{item.Comment_Created_Date}</span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          />
        ) : (
          'Be first one to response'
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {
  return {
    commentBlog: request => {
      dispatch(commentBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(commentComponent);
