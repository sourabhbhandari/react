import * as actions from '../actions/actionType';
import {Notification} from 'antd';

export default function(state = {loading: false}, action) {
  const difficulty = {
    1: 'easy',
    2: 'medium',
    3: 'hard',
  };
  const Question_type = {
    0: 'Single choice',
    1: 'Multiple choice',
    2: 'Fill in the blanks',
  };
  const response = action.response;

  switch (action.type) {
    case actions.GET_QUESTION_LIBRARY_SUCCESS:
      let questionData = [];
      if (response.status) {
        response.data[0].map(item => {
          if (item.Is_Already_Added_To_Test === '0') {
            questionData.push({
              Question_Text: item.Question_Text,
              question_type: Question_type[item.Question_Type],
              created_on: '20/02/20',
              tags: [
                difficulty[item.Question_Difficulty_Level],
                item.Category_Name,
              ],
              Question_Category_Id: item.Question_Category_Id,
              key: item.Question_Id,
              created_by: item.Created_By_Username,
              is_Already_added: item.Is_Already_Added_To_Test,
            });
          }
        });
      } else {
        Notification['error']({
          message: 'Error',
          description: response.error[0].message,
        });
      }
      return {
        questionData: [...questionData],
        ...response,
        loading: false,
      };
    case actions.LOADING_UI:
      return {...state, loading: true};
    case actions.GET_QUESTION_LIBRARY_ERROR:
      Notification['error']({
        message: 'Error',
        description: response,
      });
      return {response, loading: false};
    default:
      return state;
  }
}
