import { API_HOST } from '../../../constants';

export const selectCategoryService = id => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/category?Category_Id=${id}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const categoryListService = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/categoryList`, requestOptions)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};

export const categorySubscriptionService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/categorySubscription`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log('error', error));
};
