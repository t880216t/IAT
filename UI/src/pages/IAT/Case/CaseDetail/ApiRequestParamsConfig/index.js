import React, { useState } from 'react';
import { Input } from 'antd';
import ProCard from '@ant-design/pro-card';

import RequestHeaderConfig  from './RequestHeaderConfig'
import RequestParamsConfig  from './RequestParamsConfig'
import UrlParamsConfig  from './UrlParamsConfig'
import RequestBodyConfig  from './RequestBodyConfig'

export default (props) => {
  const {isCase} = props
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
      {props.data?.url_params && (
        <ProCard.TabPane key="url" tab="URL参数">
          <UrlParamsConfig isCase={isCase} data={props.data?.url_params} />
        </ProCard.TabPane>
      )}
      <ProCard.TabPane key="header" tab="请求头">
        <RequestHeaderConfig isCase={isCase} data={props.data?.headers} />
      </ProCard.TabPane>
      <ProCard.TabPane key="params" tab="请求参数">
        <RequestParamsConfig isCase={isCase} data={props.data?.params} />
      </ProCard.TabPane>
      <ProCard.TabPane key="body" tab="请求体">
        <RequestBodyConfig  isCase={isCase} data={props.data?.body} />
      </ProCard.TabPane>
      <ProCard.TabPane key="file" tab="发送文件">
        内容二
      </ProCard.TabPane>
    </ProCard>);
};
