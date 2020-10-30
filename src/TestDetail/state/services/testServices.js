import { API_HOST } from '../../../constants';

export const addTestService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${API_HOST}/TestingEngine/api/test`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const deleteTestService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({ Test_Id: request });
  var requestOptions = {
    method: 'DELETE',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/test`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

export const editTestService = response => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(response);
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${API_HOST}/TestingEngine/api/test`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};

export const getTestListService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({ User_Id: request });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${API_HOST}/TestingEngine/api/testSet`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
export const publishTestService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({ Test_Id: request });
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/testLink`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getTestAnalyticsService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/result-analytics?Test_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const getAttemptListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/attempted-students?Test_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
