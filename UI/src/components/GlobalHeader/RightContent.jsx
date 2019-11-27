import { Icon, Tooltip } from 'antd';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import React from 'react';
import SelectLang from '../SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar menu/>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
