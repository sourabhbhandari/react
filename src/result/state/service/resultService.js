import { API_HOST } from '../../../constants';

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
export const getUserAnalyticsService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/result-analytics?User_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
