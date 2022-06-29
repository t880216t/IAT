import React, { useState } from 'react';
import { Input } from 'antd';
import ProCard from '@ant-design/pro-card';

import ResponseHeader  from './ResponseHeader'
import ResponseBody  from './ResponseBody'

export default () => {
  return (
    <ProCard
      ghost
      size="small"
      tabs={{
        type: 'card',
        tabPosition:'top',
        activeKey: undefined,
      }}
    >
      <ProCard.TabPane key="tab1" tab="响应头">
        <ResponseHeader />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="响应体">
        <ResponseBody />
      </ProCard.TabPane>
    </ProCard>);
};
