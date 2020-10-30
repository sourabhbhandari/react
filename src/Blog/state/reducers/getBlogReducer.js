import * as actions from '../actions/actionTypes';

const initialState = {};
export default function(state = null, action) {
  let response = action.customResponse;
  switch (action.type) {
    case actions.GET_BLOG_SUCCESS:
      return { ...state, ...response };
    case actions.LIKE_BLOG_SUCCESS:
      if (response.Message === 'Blog disLiked Successfully...') {
        return {
          ...state,
          Likes_Count: parseInt(state.Likes_Count) - 1,
          Like: false
        };
      } else {
        return {
          ...state,
          Likes_Count: parseInt(state.Likes_Count) + 1,
          Like: true
        };
      }

    case actions.COMMENT_BLOG_SUCCESS:
      if (response.Message === 'Comment Added Successfully...') {
        return { ...state };
      } else {
        return { ...state };
      }

    default:
      return state;
  }
}
