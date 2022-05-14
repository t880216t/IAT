import { parse } from 'querystring';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
export const beautySub = (str, len) => {
  if (str) {
    const regM = /[\u4e00-\u9fa5]/g; // 匹配中文
    const slice = str.substring(0, len);
    const chineseCharNum = (~~(slice.match(regM) && slice.match(regM).length));
    const realen = slice.length * 2 - chineseCharNum;
    return str.substr(0, realen) + (realen < str.length ? '...' : '');
  }
  return str;
};
