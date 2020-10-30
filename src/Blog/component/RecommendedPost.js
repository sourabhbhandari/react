import React, { Component } from 'react';
import { List, Avatar, Icon, Card } from 'antd';
import { connect } from 'react-redux';
import { getRecommendedBlog } from '../state/actions/actions';
import BlogCard from './BlogCards';
import '../Blog.css';
class RecommendedPost extends Component {
  componentDidMount() {
    const { categoryId } = this.props;
    this.props.getRecommendedBlog(categoryId);
  }
  render() {
    const { blogListState } = this.props;
    debugger;
    return (
      <div className="recommend-container">
        <h3>Related Article's </h3>
        <BlogCard
          blogList={
            blogListState.recommendedBlog
              ? blogListState.recommendedBlog[0]
              : []
          }
          page="blogHome"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    blogsState: { blogListState, uiState }
  } = state;
  return {
    blogListState,
    uiState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRecommendedBlog: request => {
      dispatch(getRecommendedBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecommendedPost);
