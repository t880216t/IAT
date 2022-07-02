import React, {Component} from 'react';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {AutoComplete, Form, message, Row, Select} from 'antd';
import {connect} from 'dva';

import { queryProjectListPre } from '@/pages/IAT/Config/service'
import styles from './index.less';

const {Option} = Select;

export default (props) => {
  const {data} = props;
  const proxyList =[]
  return (
    <ProForm
      layout={'horizontal'}
      grid={true}
      rowProps={{
        gutter: [16, 0],
      }}
      submitter={false}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
      }}
      initialValues={data}
    >
      <ProFormRadio.Group
        colProps={{xl: 8, md: 12}}
        name="task_type"
        label={'任务类型'}
        options={[
          {
            value: 1,
            label: '即时任务',
          },
          {
            value: 2,
            label: '定时任务',
          },
        ]}
      />
      <ProFormSelect
        colProps={{xl: 8, md: 12}}
        label="所属项目"
        readonly
        name="project"
        request={async () => {
          const response = await queryProjectListPre();
          return response.content;
        }}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' }
        }}
      />
      <Form.Item label="全局代理" name="proxy">
        <AutoComplete
          placeholder="请输入代理信息,eg: http://127.0.0.1:8888"
          style={{width: 300}}
        >
          {proxyList?.map(item => (
            <AutoComplete.Option key={item.id} value={item.value}>{item.label}</AutoComplete.Option>
          ))}
        </AutoComplete>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form) => {
          return (
            form?.getFieldValue('task_type') === 2 && (
              <ProFormText
                colProps={{xl: 8, md: 12}}
                name="cron"
                label="cron表达式"
                placeholder="请输入"
                tooltip={
                  <span>
                    参考
                    <a href="https://tool.lu/crontab/" target="_blank" rel="noreferrer">
                      在线Cron表达式生成器
                    </a>
                  </span>
                }
              />
            )
          )
        }}
      </Form.Item>
      <ProFormText
        colProps={{xl: 8, md: 12}}
        name="addInfo"
        label="创建信息"
        readonly
      />
      <ProFormText
        colProps={{xl: 8, md: 12}}
        name="updateInfo"
        label="更新信息"
        readonly
      />
      <ProFormTextArea colProps={{span: 18}} name="description" label="任务描述"/>
    </ProForm>);
}
