import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { homeback } = props.login
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes, props);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container} style={{ backgroundImage: `url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')` }}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings, login }) => ({ ...settings, login }))(UserLayout);
