import * as action from './actionType';

//batch

export const getBatchList = item => {
  return {
    type: action.GET_BATCH_LIST,
    item
  };
};

export const createBatch = item => {
  return {
    type: action.CREATE_BATCH,
    item
  };
};

export const updateBatch = item => {
  return {
    type: action.UPDATE_BATCH,
    item
  };
};
export const activeBatch = item => {
  return {
    type: action.ACTIVE_BATCH,
    item
  };
};
export const getCategoryList = () => {
  return {
    type: action.GET_BATCH_CATEGORY_LIST
  };
};
//subject
export const getSubjectList = item => {
  return {
    type: action.GET_SUBJECT_LIST,
    item
  };
};
export const addSubject = item => {
  return {
    type: action.ADD_SUBJECT,
    item
  };
};
export const deleteSubject = item => {
  return {
    type: action.DELETE_SUBJECT,
    item
  };
};
export const deleteSubjectFaculty = item => {
  return {
    type: action.DELETE_SUBJECT_FACULTY,
    item
  };
};
//teacher
export const getInstituteTeacher = item => {
  return {
    type: action.GET_INSTITUTE_TEACHER,
    item
  };
};
export const addInstituteTeacher = item => {
  return {
    type: action.ADD_INSTITUTE_TEACHER,
    item
  };
};
export const getTeacherList = item => {
  return {
    type: action.GET_TEACHER_LIST,
    item
  };
};

export const deleteTeacher = item => {
  return {
    type: action.DELETE_TEACHER,
    item
  };
};
//student
export const getStudentList = item => {
  return {
    type: action.GET_STUDENT_LIST,
    item
  };
};
export const addStudent = item => {
  return {
    type: action.ADD_STUDENT,
    item
  };
};
export const addInstituteStudent = item => {
  return {
    type: action.ADD_INSTITUTE_STUDENT,
    item
  };
};

export const deleteStudent = item => {
  return {
    type: action.DELETE_STUDENT,
    item
  };
};

export const getAllStudent = item => {
  return {
    type: action.GET_ALL_STUDENT,
    item
  };
};
//announcement
export const getAnnouncementList = item => {
  return {
    type: action.GET_ANNOUNCEMENT_LIST,
    item
  };
};
export const createAnnouncement = item => {
  return {
    type: action.CREATE_ANNOUNCEMENT,
    item
  };
};
export const deleteAnnouncement = item => {
  return {
    type: action.DELETE_ANNOUNCEMENT,
    item
  };
};
export const updateAnnouncement = item => {
  return {
    type: action.UPDATE_ANNOUNCEMENT,
    item
  };
};
//assignment
export const createAssignment = item => {
  return {
    type: action.CREATE_ASSIGNMENT,
    item
  };
};
export const updateAssignment = item => {
  return {
    type: action.UPDATE_ASSIGNMENT,
    item
  };
};
export const getAssignmentList = item => {
  return {
    type: action.GET_ASSIGNMENT_LIST,
    item
  };
};
export const deleteAssignment = item => {
  return {
    type: action.DELETE_ASSIGNMENT,
    item
  };
};
