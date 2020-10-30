import { combineReducers } from 'redux';

import uiReducer from './uiReducer';
import batchListReducer from './batchListReducer';
import createBatchReducer from './createBatchReducer';
import studentReducer from './studentReducer';
import subjectReducer from './subjectReducer';
import teacherReducer from './teacherReducer';
import announcementReducer from './announcementReducer';
import assignmentReducer from './assignmentReducer';

const batchRootReducer = combineReducers({
  batchListState: batchListReducer,
  createBatchState: createBatchReducer,
  studentState: studentReducer,
  subjectState: subjectReducer,
  teacherState: teacherReducer,
  announcementState: announcementReducer,
  assignmentState: assignmentReducer,
  uiState: uiReducer
});
export default batchRootReducer;
