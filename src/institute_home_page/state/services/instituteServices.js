import {API_HOST} from '../../../constants';

export const instituteService = () => {
  console.log('hello service');
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({Institute_Id: '1'});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(`${API_HOST}/TestingEngine/api/testSet`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};
export const instituteDetailService = () => {
  return fetch(`${API_HOST}/TestingEngine/api/institute?Institute_Id=1`)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const getTestListService = () => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({User_Id: '32'});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${API_HOST}/TestingEngine/api/testSet`, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(error => console.log('error', error));
};
export const querySubmitService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(`${API_HOST}/TestingEngine/api/institute/addQuery`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
