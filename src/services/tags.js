// use localStorage to store the authority info, which might be sent from server in actual project.
export function getTage() {
  return JSON.parse(localStorage.getItem('iat-tage')) || '';
}

export function setTage(tage) {
  const strTage = JSON.stringify(tage);
  return localStorage.setItem('iat-tage', strTage);
}
