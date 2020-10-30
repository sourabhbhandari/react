import * as actions from '../actions/actionType';

let initialState = {
  Analytics: [
    { percentage: 100, color: '#108ee9', name: 'Accuracy' },
    { percentage: 100, color: '#87d068', name: 'Difficulty Level' },
    { percentage: 100, color: '	#FF7F50', name: 'Average Marks' },
    { percentage: 100, color: '#DB7093', name: 'Speed' }
  ],
  StudentList: []
};
const LEVEL = { Easy: 0, Medium: 50, Hard: 100 };
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.GET_TEST_ANALYTICS_SUCCESS:
      state.Analytics = [
        {
          percentage: parseInt(response.Accuracy),
          color: '#108ee9',
          name: 'Accuracy'
        },
        {
          percentage: LEVEL[response.Test_Difficulty_Level],
          color: '#87d068',
          name: 'Difficulty Level'
        },
        {
          percentage: parseInt(response.Average_Percentage_Marks),
          color: '	#FF7F50',
          name: 'Average Marks'
        },
        {
          percentage:
            parseInt(response.Average_Time.split(':')[0] * 60) +
            parseInt(response.Average_Time.split(':')[1] * 3600) +
            parseInt(response.Average_Time.split(':')[2]),
          color: '#DB7093',
          name: 'Speed'
        }
      ];
      return { ...state };

    case actions.GET_ATTEMPT_LIST_SUCCESS:
      state.StudentList = response;
      return { ...state };

    default:
      return state;
  }
}
