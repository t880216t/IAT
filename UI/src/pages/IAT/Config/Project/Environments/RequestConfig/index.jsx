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
export default (props) => {
  const formRef = React.useRef()
  return (
    <ProForm
      layout={"horizontal"}
      rowProps={{
        gutter: [16, 0],
      }}
      formRef={formRef}
      submitter={false}
      ghost="true"
      initialValues={props.data}
      onValuesChange={async () => {
        formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
          props.onChange(val);
        });
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          width="xs"
          label="类型"
          name="method"
          valueEnum={{
            HTTP: 'HTTP',
            HTTPS: 'HTTPS',
          }}
        />
        <ProFormText
          width="md"
          name="domain"
          label="域名"
          placeholder="请输入名称"
        />
        <ProFormDigit
          width="xs"
          label="端口"
          name="port"
        />
      </ProForm.Group>
    </ProForm>
  );
};
