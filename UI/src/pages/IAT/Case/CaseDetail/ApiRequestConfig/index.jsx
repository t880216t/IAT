import { ProForm, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import { Form, Switch } from 'antd';
import React, { useState, useRef } from 'react';

export default (props) => {
  const formRef = useRef()
  return (
    <ProForm
      layout="horizontal"
      rowProps={{
        gutter: [16, 0],
      }}
      submitter={false}
      // params={{}}
      formRef={formRef}
      initialValues={{...props.data}}
      ghost
    >
      <Form.Item noStyle shouldUpdate>
        {(props.data?.isCustomHost === 1) && (
          <ProForm.Group>
            <ProFormSelect
              readonly={props.isCase || undefined}
              width="sm"
              label="协议"
              name="protocol"
              valueEnum={{
                HTTP: 'HTTP',
                HTTPS: 'HTTPS',
              }}
            />
            <ProFormText readonly={props.isCase || undefined} width="lg" name="host" label="域名" placeholder="请输入名称"/>
            <ProFormText readonly={props.isCase || undefined} width="sm" label="端口" name="port" />
          </ProForm.Group>
        )}
      </Form.Item>
      <ProForm.Group>
        <ProFormSelect
          label="模式"
          readonly={props.isCase || undefined}
          name="method"
          width="sm"
          valueEnum={{
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            OPTION: 'OPTION',
          }}
        />
        <ProFormText readonly={props.isCase || undefined} width="lg" name="path" label="路径" placeholder="请输入" />
        <ProFormText readonly={props.isCase || undefined} width="sm" name="encoding" label="编码" placeholder="请输入" />
      </ProForm.Group>
    </ProForm>
  );
};
