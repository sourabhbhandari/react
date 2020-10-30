import { API_HOST } from '../../../constants';

export const userRegisterService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/startTest?Email_Id=${request.email}&Test_Id=${request.Test_Id}&First_Name=${request.Full_Name}&Mobile_No=${request.Mobile_Number}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
export const userAnswerSubmitService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/answerList`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const questionListService = request => {
  return fetch(
    `${API_HOST}/TestingEngine/api/question?User_Id=${request.User_Id}&Test_Id=${request.Test_Id}`
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
export const userFeedbackService = data => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(data);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/testFeedback`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getResultService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/result`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const userResultSetService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/resultSet?Test_Id=${request.Test_Id}&User_Id=${request.User_Id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const testLinkService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/test/${request}`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
