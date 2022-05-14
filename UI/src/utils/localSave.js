export const IAT_PROJECT_KEY = 'IAT_PROJECT_KEY';

export function setLocalSave(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalSave(key) {
  const str = localStorage.getItem(key) || '';
  return str;
}
