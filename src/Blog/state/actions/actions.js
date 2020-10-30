import * as action from './actionTypes';

export const getBlogList = () => {
  return {
    type: action.GET_ALL_BLOGS
  };
};
export const getCategoryBlog = item => {
  return {
    type: action.GET_CATEGORY_BLOG,
    item
  };
};
export const getRecommendedBlog = item => {
  return {
    type: action.GET_RECOMMENDED_BLOG,
    item
  };
};
export const getUserBLog = item => {
  return {
    type: action.GET_USER_BLOGS,
    item
  };
};

export const createBlogs = item => {
  return {
    type: action.CREATE_BLOG,
    item
  };
};
export const publishBlog = item => {
  return {
    type: action.PUBLISH,
    item
  };
};
export const getBlog = item => {
  return {
    type: action.GET_BLOG,
    item
  };
};
export const likeBlog = item => {
  return {
    type: action.LIKE_BLOG,
    item
  };
};
export const likeComment = item => {
  return {
    type: action.LIKE_COMMENT,
    item
  };
};
export const commentBlog = item => {
  return {
    type: action.COMMENT_BLOG,
    item
  };
};
