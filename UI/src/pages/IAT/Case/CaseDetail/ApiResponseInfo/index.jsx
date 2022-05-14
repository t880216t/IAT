import React, { useState } from 'react';
import { Input } from 'antd';
import ProForm, { ProFormText, ProFormRadio, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormTextArea, } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: 'key',
    dataIndex: 'key',
    width: '30%',
  },
  {
    title: 'value',
    dataIndex: 'value',
    renderFormItem: (_, { record }) => {
      return <Input addonBefore={record === null || record === void 0 ? void 0 : record.addonBefore}/>;
    },
  },
  {
    title: '操作',
    valueType: 'option',
  },
];
const defaultData = [
  {
    id: 624748504,
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id));
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
        内容一
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="响应体">
        内容二
      </ProCard.TabPane>
    </ProCard>);
};
