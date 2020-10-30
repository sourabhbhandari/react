import {API_HOST} from '../../../constants';

export const getQuestionLibraryService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(`${API_HOST}/TestingEngine/api/question-bank`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
export const addQuestionToTestService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/addQuestionToTest`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
