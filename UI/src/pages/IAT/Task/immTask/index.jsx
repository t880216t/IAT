import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (<Space>
      {record.labels.map(({ name, color }) => (<Tag color={color} key={name}>
        {name}
      </Tag>))}
    </Space>),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a key="editable" onClick={() => {
        var _a;
        (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
      }}>
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown key="actionGroup" onSelect={() => action === null || action === void 0 ? void 0 : action.reload()} menus={[
        { key: 'copy', name: '复制' },
        { key: 'delete', name: '删除' },
      ]}/>,
    ],
  },
];
const menu = (<Menu>
  <Menu.Item key="1">1st item</Menu.Item>
  <Menu.Item key="2">2nd item</Menu.Item>
  <Menu.Item key="3">3rd item</Menu.Item>
</Menu>);
export default () => {
  const actionRef = useRef();
  return (<ProTable columns={columns} actionRef={actionRef} cardBordered request={async (params = {}, sort, filter) => {
    console.log(sort, filter);
    return request('https://proapi.azurewebsites.net/github/issues', {
      params,
    });
  }} editable={{
    type: 'multiple',
  }} columnsState={{
    persistenceKey: 'pro-table-singe-demos',
    persistenceType: 'localStorage',
    onChange(value) {
      console.log('value: ', value);
    },
  }} rowKey="id" search={{
    labelWidth: 'auto',
  }} form={{
    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    syncToUrl: (values, type) => {
      if (type === 'get') {
        return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
      }
      return values;
    },
  }} pagination={{
    pageSize: 20,
    onChange: (page) => console.log(page),
  }} dateFormatter="string" headerTitle="高级表格" toolBarRender={() => [
    <Button key="button" icon={<PlusOutlined />} type="primary">
      新建
    </Button>,
    <Dropdown key="menu" overlay={menu}>
      <Button>
        <EllipsisOutlined />
      </Button>
    </Dropdown>,
  ]}/>);
};
