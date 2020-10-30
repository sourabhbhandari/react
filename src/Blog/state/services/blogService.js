import { API_HOST } from '../../../constants';

//get blog details
export const getBlogService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/blog?Blog_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};

// like a blog
export const likeBlogService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/likeBlog`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
//comment on a blog
export const commentBlogService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(`${API_HOST}/TestingEngine/api/blogComment`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
//get all blogs
export const getBlogListService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/blogs?Page_Size=50&Page_No=1`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
export const getCategoryBlogService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/blogs?Page_Size=50&Page_No=1&Category_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
//get user blogs
export const getUserBLogsService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/userBlogList?Page_Size=10&Page_No=1&User_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
//create blog
export const createBlogService = request => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(request);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(`${API_HOST}/TestingEngine/api/blog`, requestOptions)
    .then(response => {
      return response.json();
    })

    .catch(error => {
      console.log('error', error);
    });
};
//
export const publishBlogService = request => {
  debugger;

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/publishBlog?Blog_Id=${request.Blog_Id}&Created_By=${request.Created_By}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
export const recommendedBlogService = request => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(
    `${API_HOST}/TestingEngine/api/recommendedBlogs?Category_Id=${request}`,
    requestOptions
  )
    .then(response => {
      return response.json();
    })

    .catch(error => console.log('error', error));
};
