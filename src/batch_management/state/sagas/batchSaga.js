import { put, call } from 'redux-saga/effects';
import * as action from '../actions/actionType';
import {
  getBatchListService,
  createBatchService,
  updateBatchService,
  activeBatchService,
  getCategoryService,
  getTeacherListService,
  getInstituteTeacherService,
  addSubjectService,
  getSubjectListService,
  addStudentService,
  getStudentListService,
  deleteSubjectService,
  deleteStudentService,
  getAllStudentService,
  deleteTeacherService,
  addInstituteStudentService,
  addInstituteTeacherService,
  getAnnouncementListService,
  createAssignmentService,
  createAnnouncementService,
  deleteAnnouncementService,
  updateAnnouncementService,
  getAssignmentListService,
  updateAssignmentService,
  deleteAssignmentService
} from '../services/batchServices';

//batch
export function* getBatchListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getBatchListService, payload.item);
    const customResponse = response.data[0];
    yield put({ type: action.GET_BATCH_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}

export function* createBatchSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(createBatchService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.CREATE_BATCH_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* updateBatchListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(updateBatchService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.CREATE_BATCH_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* activeBatchSaga(payload) {
  try {
    const response = yield call(activeBatchService, payload.item);
    let customResponse = response.data[0];
    //let customResponse = { Message: 'Batch is now inActive...', Batch_Id: '1' };
    yield put({ type: action.ACTIVE_BATCH_SUCCESS, customResponse });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* getCategoryListSaga() {
  try {
    const response = yield call(getCategoryService);
    let customResponse = response.data;
    yield put({ type: action.GET_BATCH_CATEGORY_LIST_SUCCESS, customResponse });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}

//student
export function* getStudentListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getStudentListService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_STUDENT_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* addStudentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(addStudentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.ADD_STUDENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteStudentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(deleteStudentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.DELETE_STUDENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteSubjectFacultySaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(deleteTeacherService, payload.item);
    let customResponse = {
      response: response.data[0],
      Subject_Id: payload.item.Subject_Id
    };

    yield put({ type: action.DELETE_SUBJECT_FACULTY_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* getAllStudentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getAllStudentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_ALL_STUDENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}

export function* addInstituteStudentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(addInstituteStudentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.ADD_INSTITUTE_STUDENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
//subject
export function* getSubjectListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getSubjectListService, payload.item);
    let customResponse = response.data[0];
    debugger;
    yield put({ type: action.GET_SUBJECT_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* addSubjectSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(addSubjectService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.ADD_SUBJECT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteSubjectSaga(payload) {
  try {
    debugger;
    const response = yield call(deleteSubjectService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.DELETE_SUBJECT_SUCCESS, customResponse });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}

//teacher
export function* getTeacherListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getTeacherListService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_TEACHER_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* getInstituteTeacherSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getInstituteTeacherService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_INSTITUTE_TEACHER_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteTeacherSaga(payload) {
  try {
    const response = yield call(deleteTeacherService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.DELETE_TEACHER_SUCCESS, customResponse });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* addInstituteTeacherSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(addInstituteTeacherService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.ADD_INSTITUTE_TEACHER_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
//announcement
export function* getAnnouncementListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getAnnouncementListService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_ANNOUNCEMENT_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* createAnnouncementSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(createAnnouncementService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.CREATE_ANNOUNCEMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteAnnouncementSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(deleteAnnouncementService, payload.item);
    let customResponse = {
      Message: response.data[0].Message,
      Announcement_Id: payload.item.Announcement_Id
    };

    yield put({ type: action.DELETE_ANNOUNCEMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* updateAnnouncementSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(updateAnnouncementService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.UPDATE_ANNOUNCEMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
//assignment
export function* createAssignmentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(createAssignmentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.CREATE_ASSIGNMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* getAssignmentListSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(getAssignmentListService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.GET_ASSIGNMENT_LIST_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* deleteAssignmentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(deleteAssignmentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.DELETE_ASSIGNMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
export function* updateAssignmentSaga(payload) {
  try {
    yield put({ type: action.BATCH_LOADING_UI });
    const response = yield call(updateAssignmentService, payload.item);
    let customResponse = response.data[0];
    yield put({ type: action.UPDATE_ASSIGNMENT_SUCCESS, customResponse });
    yield put({ type: action.STOP_BATCH_LOADING_UI });
  } catch (err) {
    yield put({
      type: action.SET_BATCH_ERRORS,
      error: 'error while fetching data'
    });
  }
}
