//foruser blog list and blog home blog-list
import * as actions from '../actions/actionTypes';

const initialState = {
  allBlogs: [],
  userBlogs: [],
  recommendedBlog: []
};
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.GET_ALL_BLOGS_SUCCESS:
      const allBlogs = response.filter(item => item.Is_Active === '1');

      return { ...state, allBlogs };
    case actions.GET_USER_BLOGS_SUCCESS:
      return { ...state, userBlogs: response };
    case actions.GET_CATEGORY_BLOG_SUCCESS:
      return { ...state, allBlogs: response };
    case actions.PUBLISH_SUCCESS:
      if (response.Message === 'Blog Published Successfully...') {
        state.userBlogs.map(item => {
          if (item.Blog_Id === response.Blog_Id) {
            item.Is_Active = 1;
          }
        });
      } else {
        state.userBlogs.map(item => {
          if (item.Blog_Id === response.Blog_Id) {
            item.Is_Active = 0;
          }
        });
      }
      return { ...state };
    case actions.GET_RECOMMENDED_BLOG_SUCCESS:
      return { ...state, recommendedBlog: [response] };
    default:
      return state;
  }
}
