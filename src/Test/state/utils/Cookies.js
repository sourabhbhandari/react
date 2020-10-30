export function setStorage(cname, cvalue) {
  if (typeof cvalue === 'string') {
    localStorage.setItem(cname, cvalue);
  }
  if (typeof cvalue === 'object') {
    localStorage.setItem(cname, JSON.stringify(cvalue));
  }
}
export function getStorage(cname) {
  let registerDetails = '';
  registerDetails = localStorage.getItem(cname);

  if (registerDetails.indexOf('{') > -1) {
    registerDetails = JSON.parse(registerDetails);
  }
  return registerDetails;
}
export function checkStorage() {
  let registerDetails = getStorage('registerDetails');
  return registerDetails;
}
