import {API_HOST} from '../../constants';

export const registerUserService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(`${API_HOST}/TestingEngine/addUser`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('Auth error', error));
};

export const loginUserService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(`${API_HOST}/TestingEngine/loginUser`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('Auth error', error));
};
