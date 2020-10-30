import { API_HOST } from '../../../constants';

//get all batch
export const getBatchListService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/plain');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/batchList?Institute_Id=${request.Institute_Id}&User_Id=${request.User_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

//create blog
export const createBatchService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/batch`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => {
      console.log('error', error);
    });
};
export const getCategoryService = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/allCategoryList`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const updateBatchService = payload => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(payload);
  var requestOptions = {
    method: 'PUT',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/batch`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const activeBatchService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/batchActive`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getTeacherListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/facultyList?Institute_Id=1&Batch_Id=${request.Batch_Id}&Subject_Id=${request.Subject_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getInstituteTeacherService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/facultyList?Institute_Id=1`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const addSubjectService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${API_HOST}/TestingEngine/api/addSubject`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const deleteSubjectService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/deleteSubject`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const getSubjectListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    request.Institute_Id
      ? `${API_HOST}/TestingEngine/api/subjectList?Institute_Id=${request.Institute_Id}&Batch_Id=${request.Batch_Id}&SubCategory_Id=${request.SubCategory_Id}`
      : `${API_HOST}/TestingEngine/api/subjectList?SubCategory_Id=${request.SubCategory_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const addStudentService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/addStudent`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const deleteStudentService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/deleteStudent`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getStudentListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/studentList?Institute_Id=${request.Institute_Id}&Batch_Id=${request.Batch_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getAllStudentService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/studentList?Institute_Id=${request.Institute_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const deleteTeacherService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'DELETE',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/deleteFaculty`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const addInstituteStudentService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/student`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const addInstituteTeacherService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/faculty`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
//announcement
export const getAnnouncementListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/announcement?Institute_Id=${request.Institute_Id}&Batch_Id=${request.Batch_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const createAnnouncementService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/announcement`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const deleteAnnouncementService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'DELETE',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/announcement`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const updateAnnouncementService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PUT',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/announcement`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
//assignment
export const createAssignmentService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/assignment`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getAssignmentListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/assignment?Institute_Id=${request.Institute_Id}&Batch_Id=${request.Batch_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const deleteAssignmentService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'DELETE',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/assignment`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const updateAssignmentService = request => {
  var raw = JSON.stringify(request);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PUT',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/assignment`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
