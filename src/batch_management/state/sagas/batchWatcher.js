import { takeLatest } from 'redux-saga/effects';
import * as action from '../actions/actionType';
import {
  getBatchListSaga,
  createBatchSaga,
  updateBatchListSaga,
  activeBatchSaga,
  getCategoryListSaga,
  getStudentListSaga,
  addStudentSaga,
  getSubjectListSaga,
  addSubjectSaga,
  getTeacherListSaga,
  deleteSubjectSaga,
  deleteSubjectFacultySaga,
  deleteStudentSaga,
  getAllStudentSaga,
  deleteTeacherSaga,
  addInstituteStudentSaga,
  addInstituteTeacherSaga,
  getInstituteTeacherSaga,
  getAnnouncementListSaga,
  createAssignmentSaga,
  deleteAnnouncementSaga,
  createAnnouncementSaga,
  updateAnnouncementSaga,
  getAssignmentListSaga,
  deleteAssignmentSaga,
  updateAssignmentSaga
} from './batchSaga';

export default function* blogWatcher() {
  yield takeLatest(action.GET_BATCH_LIST, getBatchListSaga);
  yield takeLatest(action.CREATE_BATCH, createBatchSaga);
  yield takeLatest(action.UPDATE_BATCH, updateBatchListSaga);
  yield takeLatest(action.ACTIVE_BATCH, activeBatchSaga);
  yield takeLatest(action.GET_BATCH_CATEGORY_LIST, getCategoryListSaga);
  yield takeLatest(action.GET_STUDENT_LIST, getStudentListSaga);
  yield takeLatest(action.ADD_STUDENT, addStudentSaga);
  yield takeLatest(action.DELETE_STUDENT, deleteStudentSaga);
  yield takeLatest(action.ADD_INSTITUTE_STUDENT, addInstituteStudentSaga);
  yield takeLatest(action.GET_SUBJECT_LIST, getSubjectListSaga);
  yield takeLatest(action.ADD_SUBJECT, addSubjectSaga);
  yield takeLatest(action.DELETE_SUBJECT, deleteSubjectSaga);
  yield takeLatest(action.DELETE_SUBJECT_FACULTY, deleteSubjectFacultySaga);
  yield takeLatest(action.GET_TEACHER_LIST, getTeacherListSaga);
  yield takeLatest(action.DELETE_TEACHER, deleteTeacherSaga);
  yield takeLatest(action.ADD_INSTITUTE_TEACHER, addInstituteTeacherSaga);
  yield takeLatest(action.GET_ALL_STUDENT, getAllStudentSaga);
  yield takeLatest(action.GET_INSTITUTE_TEACHER, getInstituteTeacherSaga);
  yield takeLatest(action.CREATE_ANNOUNCEMENT, createAnnouncementSaga);
  yield takeLatest(action.GET_ANNOUNCEMENT_LIST, getAnnouncementListSaga);
  yield takeLatest(action.UPDATE_ANNOUNCEMENT, updateAnnouncementSaga);
  yield takeLatest(action.DELETE_ANNOUNCEMENT, deleteAnnouncementSaga);
  yield takeLatest(action.CREATE_ASSIGNMENT, createAssignmentSaga);
  yield takeLatest(action.GET_ASSIGNMENT_LIST, getAssignmentListSaga);
  yield takeLatest(action.DELETE_ASSIGNMENT, deleteAssignmentSaga);
  yield takeLatest(action.UPDATE_ASSIGNMENT, updateAssignmentSaga);
}
