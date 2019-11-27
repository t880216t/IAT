/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

const beautySub = (str, len) => {
  const cnReg = /[\u4e00-\u9fa5]/g; // 匹配中文
  const slice = str.substring(0, len);
  const chineseCharNum = (~~(slice.match(cnReg) && slice.match(cnReg).length));
  const realen = slice.length * 2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? '...' : '');
}

export { isAntDesignProOrDev, isAntDesignPro, isUrl, beautySub };
