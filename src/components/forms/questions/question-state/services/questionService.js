import {questionData} from '../../question_data';
import {put} from 'redux-saga/effects';
import * as ACTIONS from '../actions';
import {API_HOST} from '../../../../../constants';

let pendingStatus = false;
function generatePromiseData(data) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(data); // After 300 ms, resolve the promise with value 42
    }, 300);
  });
}
export const addQuestionService = request => {
  const QUESTION_API_ENDPOINT = `${API_HOST}/TestingEngine/api/question`;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(QUESTION_API_ENDPOINT, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const editQuestionService = request => {
  const QUESTION_API_ENDPOINT = `${API_HOST}/TestingEngine/api/question`;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(QUESTION_API_ENDPOINT, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const getQuestionListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/question?User_Id=${request.User_Id}&Test_Id=${request.TestId}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
