import * as actions from '../actions/actionType';

export default function(state = [], action) {
  const difficulty = {
    1: 'easy',
    2: 'easy',
    3: 'medium',
    4: 'hard',
    5: 'hard'
  };
  const Question_type = {
    0: 'Single choice',
    1: 'Multiple choice',
    2: 'Fill in the blanks'
  };
  const response = action.response;
  switch (action.type) {
    case actions.SORT_QUESTION_LIBRARY_SUCCESS:
      let questionData = [];
      response.data[0].map(item => {
        questionData.push({
          Question_Text: item.Question_Text,
          question_type: Question_type[item.Question_Type],
          created_on: '20/02/20',
          tags: [
            difficulty[item.Question_Difficulty_Level],
            item.Category_Name
          ],
          created_by: 'sachin'
        });
      });
      return [...questionData];
    case actions.SORT_QUESTION_LIBRARY_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}
