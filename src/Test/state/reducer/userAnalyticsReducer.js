import * as actions from '../action/actionType';

let initialState = {
  Analytics: [
    { percentage: 0, color: '#108ee9', name: 'Accuracy' },
    { percentage: 0, color: '#87d068', name: 'Difficulty Level' },
    { percentage: 0, color: '	#FF7F50', name: 'Average Marks' },
    { percentage: 0, color: 'yellow', name: 'Speed' }
  ],
  StudentList: []
};
const LEVEL = { Easy: 0, Medium: 50, Hard: 100 };
export default function(state = initialState, action) {
  const response = action.customResponse;
  switch (action.type) {
    case actions.GET_USER_ANALYTICS_SUCCESS:
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
          color: 'yellow',
          name: 'Speed'
        }
      ];
      return { ...state };
    default:
      return state;
  }
}
