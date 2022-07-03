import ProList from '@ant-design/pro-list';
import { ProCard } from '@ant-design/pro-components';

import {Progress, Tag} from 'antd';

import styles from './index.less'
import React from "react";

export default () => {
  const data = [
    '校验请求状态码',
    '校验请求返回值不为空',
    '校验特定参数值',
  ].map((item) => ({
    title: item,
    content: item,
  }));
  return (
    <ProCard gutter={[16, 16]} wrap>
      {data && data.map(item => (
        <ProCard
          title={
            <>
              {item.title}
              <Tag color="blue" style={{marginLeft:10}}>Json Path</Tag>
            </>
          }
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          hoverable
          bordered
          size="small"
          extra={
            <a>详情</a>
          }
        >
          {item.content}
        </ProCard>
      ))}
    </ProCard>
  )
};
