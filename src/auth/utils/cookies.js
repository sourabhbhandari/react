export function setStorage(cname, cvalue) {
  if (typeof cvalue === 'string') {
    localStorage.setItem(cname, cvalue);
  } else if (typeof cvalue === 'object') {
    localStorage.setItem(cname, JSON.stringify(cvalue));
  }
}

export function getStorage(cname) {
  let userDetails = '';
  userDetails = localStorage.getItem(cname);
  if (userDetails && userDetails.indexOf('{') > -1) {
    userDetails = JSON.parse(userDetails);
  }

  return userDetails;
}

export function checkStorage() {
  let user = getStorage('user');
  return user;
}

export function signout() {
  const user = checkStorage();
  setStorage('user', { ...user, isLoggedIn: false });
  return false;
}
