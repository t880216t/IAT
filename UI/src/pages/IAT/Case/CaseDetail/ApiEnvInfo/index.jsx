import { ProForm, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import React, { useState } from 'react';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  return (
    <ProForm
      layout={"horizontal"}
      rowProps={{
        gutter: [16, 0],
      }}
      submitter={false}
      params={{}}
      ghost
    >
      <ProForm.Group>
        <ProFormSelect
          width="sm"
          label="类型"
          name="method"
          valueEnum={{
            HTTP: 'HTTP',
            HTTPS: 'HTTPS',
          }}
        />
        <ProFormText width="xl" name="domain" label="域名" placeholder="请输入名称"/>
        <ProFormDigit width="sm" label="端口" name="port" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="模式"
          name="level"
          width="sm"
          valueEnum={{
            1: 'front end',
            2: 'back end',
            3: 'full stack',
          }}
        />
        <ProFormText width="xl" name="company" label="路径" placeholder="请输入" />
        <ProFormText width="sm" name="encode" label="编码" placeholder="请输入" />
      </ProForm.Group>
    </ProForm>
  );
};
